'use client';

import CreateJobOfferForm from './create-job-offer-form';

export default function PageHeader(props: {
  jobOfferStatus: JobOfferStatus[];
}) {
  const { jobOfferStatus } = props;
  return (
    <div className=''>
      <CreateJobOfferForm jobOfferStatus={jobOfferStatus} />
    </div>
  );
}
