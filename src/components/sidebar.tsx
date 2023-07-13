'use client';

import { Cog } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { isActiveLink, routes } from '@/config/route';
import Link from 'next/link';

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
            {routes.map((route) => (
              <NavLink key={route.link} {...route} />
            ))}
          </div>
        </div>
        <div className='px-4 py-2'>
          <h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
            Paramètre
          </h2>
          <div className='space-y-1'>
            <Button variant='ghost' size='sm' className='w-full justify-start'>
              <Cog className='mr-2 h-4 w-4' />
              Comptes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type NavLink = (typeof routes)[number];
function NavLink(props: NavLink) {
  const { name, link, Icon } = props;
  return (
    <Link className='block' href={link}>
      <Button
        variant={isActiveLink(link) ? 'secondary' : 'ghost'}
        size='sm'
        className='w-full justify-start'>
        <Icon className='mr-2 h-4 w-4' />
        {name}
      </Button>
    </Link>
  );
}
