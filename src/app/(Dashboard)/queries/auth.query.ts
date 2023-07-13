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

export async function updateUserProfile(payload: Partial<Profile>) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', payload.id)
      .select();
    return profile;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserCompany(user?: User) {
  if (!user) return null;
  const supabase = createServerSupabaseClient();
  try {
    const { data: company } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    return company;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateCompanyProfile(payload: Partial<CompanyProfile>) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: company } = await supabase
      .from('company_profiles')
      .update(payload)
      .eq('id', payload.id)
      .select();
    return company;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
