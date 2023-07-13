'use client';

import { useSupabase } from '@/app/supabase-provider';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
} from '@/components/ui';
import { userAtom } from '@/stores/user.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom est trop court')
    .max(200, 'Le nom est trop long'),
  description: z
    .string()
    .min(3, 'La description est trop court')
    .max(1000, 'La description est trop long'),
  status_id: z
    .string({ required_error: 'Sélectionnez un status' })
    .uuid('status invalid'),
});

type FormSchema = z.infer<typeof formSchema>;

type CreateJobOfferFormProps = { jobOfferStatus: JobOfferStatus[] };
export default function CreateJobOfferForm(props: CreateJobOfferFormProps) {
  const { jobOfferStatus } = props;
  const auth = useAtomValue(userAtom);
  const { supabase } = useSupabase();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      status_id: jobOfferStatus.at(0)?.id,
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log({ values });
    // const { data, error } = await supabase.from('job_offers').insert({
    //   ...values,
    //   created_by: auth.user?.id,
    //   company_id: ,
    // });
  }

  return (
    <div className=''>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='default'>Créer</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Créer une offre</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form id='form' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4 py-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ex: johndoe@gmail.com'
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='status_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexe</FormLabel>
                      <Select
                        onValueChange={(e) => field.onChange(e)}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Sélectionnez un status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobOfferStatus.map(({ id, code, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <SheetFooter>
            <SheetClose asChild>
              <Button type='button' variant='secondary'>
                Annuler
              </Button>
            </SheetClose>
            <Button form='form' type='submit'>
              Enregistrer
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
