'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNotification } from '@/lib/hooks';
import { useSupabase } from '@/app/supabase-provider';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/stores/user.store';

const companyFormSchema = z.object({
  social_reason: z
    .string({ required_error: 'Champ obligatoire' })
    .min(2, {
      message: 'Votre nom doit comporter au mois 3 caractères.',
    })
    .max(50, {
      message: 'Votre nom ne doit pas dépasser 50 caractères.',
    }),
  rccm: z
    .string({ required_error: 'Champ obligatoire' })
    .min(2, {
      message: 'Votre nom doit comporter au mois 3 caractères.',
    })
    .max(50, {
      message: 'Votre nom ne doit pas dépasser 50 caractères.',
    }),
  ifu: z
    .string({ required_error: 'champ obligatoire' })
    .min(12, {
      message: 'Votre numéro IFU doit comporter aux moins 12 chiffres',
    })
    .max(13, {
      message: 'Votre prénom ne doit pas dépasser 50 caractères.',
    }),
  email: z
    .string({ required_error: 'champ obligatoire' })
    .email('Renseigner un mail valid'),
  address: z
    .string({ required_error: 'Champ obligatoire' })
    .min(2, {
      message: 'Renseigner une addresse valide',
    })
    .max(250, {
      message: 'Votre addresse est trop long.',
    }),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  phone_number: z.string().max(12, 'Numéro de téléphone trop long.'),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;
type CompanyInformationForm = { company: CompanyProfile | null };

export function CompanyInformationForm(props: CompanyInformationForm) {
  const { company } = props;
  const account = useAtomValue(userAtom);
  const notify = useNotification();
  const { supabase } = useSupabase();
  const form = useForm<CompanyFormValues>({
    defaultValues: { ...company },
    resolver: zodResolver(companyFormSchema),
    mode: 'onChange',
  });

  async function createCompany(payload: Partial<CompanyProfile>) {
    console.log({ payload });
    const {
      data: res,
      error,
      status,
    } = await supabase
      .from('company_profiles')
      .insert({ ...company, ...payload, user_id: account.user?.id })
      .select();
    console.log(res);
    if (error) {
      notify.error();
      console.log(error);
    }
  }

  async function updateCompany(payload: Partial<CompanyProfile>) {
    console.log({ payload });
    const {
      data: res,
      error,
      status,
    } = await supabase
      .from('company_profiles')
      .update({ ...company, ...payload, user_id: account.user?.id })
      .select();
    console.log(res);
    if (error) {
      notify.error();
      console.log(error);
    }
  }

  async function onSubmit(data: CompanyFormValues) {
    console.log({ data });
    if (company) {
      await updateCompany({ ...data });
    } else {
      await createCompany({ ...data });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='social_reason'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raison sociale</FormLabel>
              <FormControl>
                <Input placeholder='Ex: MonJob' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='rccm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>RCCM</FormLabel>
              <FormControl>
                <Input placeholder='Ex: RCCM ## ##' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ifu'
          render={({ field }) => (
            <FormItem>
              <FormLabel>IFU</FormLabel>
              <FormControl>
                <Input placeholder='Ex: # #### #### ####' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Ex: # #### #### ####'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Ex: # #### #### ####'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo */}

        <Button type='submit'>{company ? 'Modifier' : 'Enregistrer'}</Button>
      </form>
    </Form>
  );
}
