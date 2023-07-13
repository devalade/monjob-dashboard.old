import { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/app/supabase-server';
import { UserNav } from '@/app/(Dashboard)/profiles/components/user-nav';
import { getCompanyData } from './queries';
import { getUserProfile } from './queries/auth.query';
import { PageTitle } from '@/config/page-title';
import { ScrollArea, ScrollBar } from '@/components/ui';

export const metadata: Metadata = {
  title: 'MonJob - Dashboard',
  description: 'Votre espace de travail',
};

export default async function DashboardLayout(props: PropsWithChildren) {
  const { children } = props;
  const session = await getSession();
  const profile = await getUserProfile(session?.user);
  const company = await getCompanyData(session?.user);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <>
      <div className='md:hidden'>
        <Image
          src='/examples/music-light.png'
          width={1280}
          height={1114}
          alt='Music'
          className='block dark:hidden'
        />
        <Image
          src='/examples/music-dark.png'
          width={1280}
          height={1114}
          alt='Music'
          className='hidden dark:block'
        />
      </div>
      <div className='hidden md:block h-screen '>
        {/*<Menu />*/}
        <div className='h-full'>
          <div className='bg-background h-full'>
            <div className='grid lg:grid-cols-5 max-h-screen h-full '>
              <Sidebar className='hidden lg:block bg-gradient-to-b from-green-500 to-green-600 text-green-50 ' />
              <div className='col-span-3 lg:col-span-4 lg:border-l h-screen'>
                <nav className='bg-white w-full px-5 h-[80px] flex items-center justify-between dark:bg-slate-900'>
                  <PageTitle />
                  <UserNav
                    user={session.user}
                    profile={profile}
                    company={company}
                  />
                </nav>
                <ScrollArea className='h-[calc(100%-80px)] px-4 py-6 lg:px-8 bg-gray-100'>
                  {children}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
