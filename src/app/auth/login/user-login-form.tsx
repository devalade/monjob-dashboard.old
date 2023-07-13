'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Button,
  Label,
  Input,
  FormLabel,
  FormControl,
  FormField,
  Form,
  FormItem,
  FormDescription,
  FormMessage,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/app/supabase-provider';
import { useNotification } from '@/lib/hooks';

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email({
    message: 'Email invalid',
  }),
  password: z.string().min(8, {
    message: 'Mot de passe doit comporter 08 caractères',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function UserLoginForm(props: UserLoginFormProps) {
  const { className, ...restProps } = props;
  const { supabase } = useSupabase();
  const notify = useNotification();
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [status, setStatus] = React.useState<RequestStatus>('idle');

  async function onSubmit(values: FormSchema) {
    setStatus('loading');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (data) {
      router.push('/dashboard');
      setStatus('idle');
    }

    if (error) {
      setStatus('error');
      notify.error('Une erreur est survenue');
    }
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: 'aladecharaf23@gmail.com',
      password: 'Pa$$w0rd!',
    });
    router.refresh();
  };

  return (
    <div className={cn('grid gap-6', className)} {...restProps}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ex: johndoe@gmail.com'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder='*******' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={handleSignIn}
              type='button'
              disabled={status == 'loading'}>
              {status == 'loading' && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              Se connecter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
