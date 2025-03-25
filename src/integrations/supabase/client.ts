
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lvkdbrqxbshlidxxhovq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2a2RicnF4YnNobGlkeHhob3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjM0NzAsImV4cCI6MjA1ODMzOTQ3MH0.xu3CLvZcou9v6h8a9JGqXvbVKOaYu1HS1OkUExKOAgw";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage
  }
});

// Simple session validation function
export const validateSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return !error && !!data.session;
  } catch (e) {
    console.error("Session validation error:", e);
    return false;
  }
};
