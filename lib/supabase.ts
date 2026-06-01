import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id?: string;
  name: string;
  score: number;
  created_at?: string;
}

export async function saveScore(name: string, score: number) {
  const { data, error } = await supabase
    .from('leaderboard')
    .insert([{ name, score }])
    .select();

  if (error) {
    console.error('Error saving score:', error);
    return null;
  }

  return data;
}

export async function getLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data || [];
}
