
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.17.1'
import { HexcodeGenerator } from '../lib/hexcode-generator.ts'

// CORS headers for API responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('[math-exam] Function started with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('[math-exam] Handling OPTIONS request for CORS');
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('S_URL');
    const supabaseKey = Deno.env.get('S_SERVICE_ROLE_KEY');
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!supabaseUrl || !supabaseKey || !anthropicKey) {
      console.error('[math-exam] Missing environment variables');
      throw new Error('Server configuration error');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log('[math-exam] Request received:', requestBody);
    } catch (error) {
      console.error('[math-exam] Error parsing request:', error);
      throw new Error('Invalid request format');
    }

    // Extract parameters
    const { subject = 'Mathematik', difficulty = 'Grundkurs' } = requestBody;
    
    // Generate unique hexcode
    const hexCode = HexcodeGenerator.generateSequential();
    console.log('[math-exam] Parameters:', { subject, difficulty, hexCode });

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    console.log('[math-exam] Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('[math-exam] No authorization header');
      throw new Error('Authentication required');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('[math-exam] Token length:', token.length);
    
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError) {
      console.error('[math-exam] Authentication error:', userError);
      throw new Error('Unauthorized access: ' + userError.message);
    }
    
    if (!user) {
      console.error('[math-exam] No user found with token');
      throw new Error('Unauthorized access: User not found');
    }
    
    console.log('[math-exam] Authenticated user:', user.id);

    // Get user's bundesland from profile
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('bundesland')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('[math-exam] Error fetching profile:', profileError);
      throw new Error('Could not retrieve user profile');
    }

    const bundesland = profileData?.bundesland || 'Berlin'; // Default fallback
    console.log('[math-exam] User bundesland:', bundesland);

    // Create initial exam entry
    const { data: exam, error: examError } = await supabaseClient
      .from('exams')
      .insert({
        user_id: user.id,
        subject: subject,
        hexcode: hexCode,
        bundesland: bundesland,
        difficulty: difficulty,
        status: 'generating',
        content: '<div style="text-align: center; padding: 2rem;"><h2>Ihre Prüfung wird generiert...</h2><p>Dieser Vorgang kann einige Minuten dauern. Bitte aktualisieren Sie die Seite nach ca. 2-3 Minuten.</p></div>'
      })
      .select()
      .single();

    if (examError) {
      console.error('[math-exam] Error creating exam:', examError);
      throw examError;
    }

    console.log('[math-exam] Created initial exam entry:', exam.id);

    // Fetch prompts from database
    console.log('[math-exam] Fetching prompts for subject:', subject);
    
    const { data: promptData, error: promptError } = await supabaseClient
      .from('exam_prompts')
      .select('system_prompt, user_prompt')
      .eq('subject', subject)
      .single();

    if (promptError) {
      console.error('[math-exam] Error fetching prompts:', promptError);
      throw promptError;
    }

    if (!promptData) {
      console.error('[math-exam] No prompt found for subject:', subject);
      throw new Error(`No prompt template found for ${subject}`);
    }

    // Prepare prompts with parameters
    const systemPrompt = promptData.system_prompt;
    const userPrompt = promptData.user_prompt
      .replace('{{bundesland}}', bundesland)
      .replace('{{hexcode}}', hexCode)
      .replace('{{difficulty}}', difficulty);

    console.log('[math-exam] Prepared prompts with parameters');
    console.log('[math-exam] System prompt (first 100 chars):', systemPrompt.substring(0, 100));
    console.log('[math-exam] User prompt (first 100 chars):', userPrompt.substring(0, 100));

    // Start async generation process
    if (typeof EdgeRuntime !== 'undefined') {
      console.log('[math-exam] Using EdgeRuntime.waitUntil for background processing');
      EdgeRuntime.waitUntil(
        generateExamContent(supabaseClient, hexCode, userPrompt, systemPrompt, anthropicKey)
          .catch(error => {
            console.error('[math-exam] Background generation error:', error);
            return updateExamWithError(supabaseClient, hexCode, error);
          })
      );
    } else {
      // Fallback without waitUntil
      console.log('[math-exam] Using traditional async approach');
      generateExamContent(supabaseClient, hexCode, userPrompt, systemPrompt, anthropicKey)
        .catch(error => {
          console.error('[math-exam] Generation process error:', error);
          updateExamWithError(supabaseClient, hexCode, error);
        });
    }

    // Return immediate success response with hexcode
    console.log('[math-exam] Returning success response with hexCode:', hexCode);
    return new Response(
      JSON.stringify({
        hexCode,
        message: 'Mathematikprüfung wird im Hintergrund generiert',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('[math-exam] Function error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

// Async function to generate the exam content
async function generateExamContent(supabaseClient, hexCode, userPrompt, systemPrompt, anthropicKey) {
  try {
    console.log('[math-exam] Starting content generation for hexcode:', hexCode);
    
    // Create Anthropic client
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    
    // Call Anthropic Claude API
    console.log('[math-exam] Calling Claude API...');
    const response = await Promise.race([
      anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 12000,
        messages: [{ role: "user", content: userPrompt }],
        system: systemPrompt,
        temperature: 0.7
      }),
      // 4-minute timeout
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('API request timeout after 4 minutes')), 240000);
      })
    ]);

    console.log('[math-exam] Received Claude API response');
    
    if (!response.content || !response.content[0]?.text) {
      throw new Error('Empty response from Claude API');
    }

    // Extract content
    const htmlContent = response.content[0].text;
    console.log('[math-exam] HTML content length:', htmlContent.length);
    
    // Update exam record with completed content
    const { error: updateError } = await supabaseClient
      .from('exams')
      .update({
        content: htmlContent,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('hexcode', hexCode);

    if (updateError) {
      console.error('[math-exam] Error updating exam:', updateError);
      throw updateError;
    }

    console.log('[math-exam] Exam generation completed successfully');
    return true;
  } catch (error) {
    console.error('[math-exam] Content generation error:', error);
    await updateExamWithError(supabaseClient, hexCode, error);
    throw error;
  }
}

// Helper to update exam with error information
async function updateExamWithError(supabaseClient, hexCode, error) {
  try {
    await supabaseClient
      .from('exams')
      .update({
        status: 'error',
        content: `<div style="color: red; padding: 2rem;"><h2>Fehler bei der Prüfungsgenerierung</h2><p>${error.message || 'Ein unbekannter Fehler ist aufgetreten'}</p><p>Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.</p></div>`,
        error_message: error.message || 'Ein unbekannter Fehler ist aufgetreten',
        updated_at: new Date().toISOString()
      })
      .eq('hexcode', hexCode);
    
    console.log('[math-exam] Updated exam status to error');
  } catch (updateError) {
    console.error('[math-exam] Failed to update exam with error:', updateError);
  }
}
