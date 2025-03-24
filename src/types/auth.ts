
export type Bundesland = 
  | 'Baden-Württemberg' 
  | 'Bayern' 
  | 'Berlin' 
  | 'Brandenburg' 
  | 'Bremen' 
  | 'Hamburg' 
  | 'Hessen' 
  | 'Mecklenburg-Vorpommern' 
  | 'Niedersachsen' 
  | 'Nordrhein-Westfalen' 
  | 'Rheinland-Pfalz' 
  | 'Saarland' 
  | 'Sachsen' 
  | 'Sachsen-Anhalt' 
  | 'Schleswig-Holstein' 
  | 'Thüringen';

export interface Profile {
  id: string;
  name: string | null;
  bundesland: Bundesland;
  subscription_status: 'trial' | 'active' | 'expired';
  trial_end_date: string;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
  } | null;
  profile: Profile | null;
  isLoading: boolean;
}
