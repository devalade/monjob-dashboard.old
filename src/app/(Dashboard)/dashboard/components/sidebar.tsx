'use client';

import { LayoutGrid, ListMusic } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-4 py-2'>
          <h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
            MonJob
          </h2>
          <div className='space-y-1'>
            <Button
              variant='secondary'
              size='sm'
              className='w-full justify-start'>
              <LayoutGrid className='mr-2 h-4 w-4' />
              Nos Offres
            </Button>
            <Button variant='ghost' size='sm' className='w-full justify-start'>
              <LayoutGrid className='mr-2 h-4 w-4' />
              Browse
            </Button>
          </div>
        </div>
        <div className='px-4 py-2'>
          <h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
            Paramètre
          </h2>
          <div className='space-y-1'>
            <Button variant='ghost' size='sm' className='w-full justify-start'>
              <ListMusic className='mr-2 h-4 w-4' />
              Comptes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
