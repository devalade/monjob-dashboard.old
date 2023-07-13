'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import fr from 'date-fns/locale/fr';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNotification } from '@/lib/hooks';
import { useSupabase } from '@/app/supabase-provider';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import format from 'date-fns/format';
import { formatDate } from '@/lib/format-date';
import { updateUserProfile } from '../../queries';
import { revalidatePath } from 'next/cache';
import { getLink } from '@/config/route';

const profileFormSchema = z.object({
  last_name: z
    .string()
    .min(2, {
      message: 'Votre nom doit comporter au mois 3 caractères.',
    })
    .max(50, {
      message: 'Votre nom ne doit pas dépasser 50 caractères.',
    }),
  first_name: z
    .string()
    .min(2, {
      message: 'Votre prénom doit comporter au mois 3 caractères.',
    })
    .max(50, {
      message: 'Votre prénom ne doit pas dépasser 50 caractères.',
    }),
  gender: z.enum(['m', 'f'], {
    required_error: 'Renseigner votre sexe.',
    invalid_type_error: 'Sexe invalid',
  }),
  birth_date: z.coerce.date({
    required_error: 'Renseigner votre date de naissance.',
    invalid_type_error: 'Date de naissance invalide',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PersonalInformationForm = { profile: Profile | null };

export function PersonalInformationForm(props: PersonalInformationForm) {
  const { profile } = props;
  const notify = useNotification();
  const { supabase } = useSupabase();
  const form = useForm<ProfileFormValues>({
    defaultValues: { ...profile },
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log({ data });
    const {
      data: res,
      error,
      status,
    } = await supabase
      .from('profiles')
      .update({ ...profile, ...data })
      .eq('id', profile?.id)
      .select();
    console.log(res);
    if (error) {
      notify.error();
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexe</FormLabel>
              <Select
                onValueChange={(e) => field.onChange(e)}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m'>Masculin</SelectItem>
                  <SelectItem value='f'>Féminin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='birth_date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date de naissance</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Sélectionnez une date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    locale={fr}
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={1900}
                    toYear={2015}
                    // captionLayout='dropdown-buttons'
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='col-span-2'>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
