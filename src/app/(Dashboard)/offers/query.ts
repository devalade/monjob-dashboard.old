import { createServerSupabaseClient } from '@/app/supabase-server';

export async function getJobOffersStatus() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: jobOfferStatus } = await supabase
      .from('job_offer_statuses')
      .select('*');

    return jobOfferStatus;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
