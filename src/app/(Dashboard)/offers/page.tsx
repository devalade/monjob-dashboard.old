import { Metadata } from 'next';
import PageHeader from './components/page-header';
import { getJobOffersStatus } from './query';

export const metadata: Metadata = {
  title: 'MonJob',
  description: 'Application de freelance pour tous.',
};

export default async function Dashboard() {
  const jobOfferStatus = await getJobOffersStatus();
  return (
    <div className=''>
      <PageHeader jobOfferStatus={jobOfferStatus ?? []} />
    </div>
  );
}
