'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSupabase } from '@/app/supabase-provider';
import { AuthSession } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/stores/user.store';
import Link from 'next/link';
import { getLink } from '@/config/route';

type UserNav = {
  user: AuthSession['user'] | null;
  profile: Profile | null;
  company: CompanyProfile | null;
};
export function UserNav(props: UserNav) {
  const { user, profile, company } = props;
  const [, setUserAtom] = useAtom(userAtom);
  const { supabase } = useSupabase();

  useEffect(() => {
    setUserAtom({ user, company, profile });
  }, [user, company, profile, setUserAtom]);

  async function onSignOut() {
    await supabase.auth.signOut();
    setUserAtom({ user: null, company: null, profile: null });
    location.reload();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt={user?.email} />
            <AvatarFallback>
              {String(profile?.last_name[0] + '' + profile?.first_name[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {profile?.last_name + ' ' + profile?.last_name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <Link href={getLink('/profiles')}>
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            Paiement
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            Paramètre
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className='cursor-pointer'>
          Déconnexion
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
