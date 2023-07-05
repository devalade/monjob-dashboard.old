import { createServerSupabaseClient } from '@/app/supabase-server';

export async function getUserProfile(user?: User) {
  if (!user) return null;
  const supabase = createServerSupabaseClient();
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    return profile;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
