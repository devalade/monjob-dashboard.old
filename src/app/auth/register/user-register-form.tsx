"use client"

import * as React from "react"

import { cn } from "@/lib/utils";
import {
    Button,
    Label,
    Input,
    FormLabel,
    FormControl,
    FormField,
    Form,
    FormItem,
    FormDescription, FormMessage
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {Icons} from "@/components/icons";
import {supabase} from "@/lib/supabaseClient";
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "Prénom doit comporter aux moins deux lettres",
    }),
    last_name: z.string().min(2, {
        message: "Nom doit comporter aux moins deux lettres",
    }),
    email: z.string().email({
        message: "Email invalid",
    }),
    password: z.string().min(8, {
        message: "Mot de passe doit comporter 08 caractères",
    }),
})

type FormSchema = z.infer<typeof formSchema>;

export function UserRegisterForm(props: UserLoginFormProps) {
    const { className, ...restProps } = props;
    const router = useRouter();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(values: FormSchema) {
        setIsLoading(true)
        console.log({values});
        try {
            const { data: authData, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        emailRedirectUri: `${location.origin}/dashboard`,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        gender: 'm',
                        birth_date: '10-10-2000'
                    },
                },
            })
            router.push('/auth/login');
        } catch (e) {
            setIsLoading(false);
            console.log({e});
        }

    }

    return (
        <div className={cn("grid gap-6", className)} {...restProps}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: johndoe@gmail.com" type='email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="*******" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Créer un compte
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}