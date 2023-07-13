'use client';

import { Separator } from '@/components/ui';
import { PropsWithChildren } from 'react';

type FormSectionProps = { title: string; description: string };
export default function FormSection(
  props: PropsWithChildren<FormSectionProps>
) {
  const { title, description, children } = props;
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}
