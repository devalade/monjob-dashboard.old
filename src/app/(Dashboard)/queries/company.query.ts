import { createServerSupabaseClient } from '@/app/supabase-server';

export async function getCompanyData(user?: User) {
  if (!user) return null;
  const supabase = createServerSupabaseClient();
  try {
    const { data: company } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();
    return company;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function createCompany(payload: Partial<CompanyProfile>) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: company } = await supabase
      .from('company_profiles')
      .insert(payload as unknown as CompanyProfile);
    return company;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateCompany(payload: Partial<CompanyProfile>) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: company } = await supabase
      .from('company_profiles')
      .insert(payload as unknown as CompanyProfile);
    return company;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
