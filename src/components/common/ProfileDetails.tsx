"use client"

import React, { useState } from 'react'
import { useAccount, useBalance, useEnsName } from 'wagmi'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { profileDetailSchema } from '@/lib/validator'
import * as z from "zod"
import { formatUnits } from 'viem'

type ProfileDetailsProps = {
   userId: string
   type: "Create" | "Update"
}

const ProfileDetails = () => {
    // Personal Details Related
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        x: '',
        github: '',
        telegram: ''
    });

    // Wallet Address Related
    const { address, chain } = useAccount();
    const { data } = useBalance({ address });
    const ens = useEnsName({ address });

    // Form Schema for shadcn-ui form
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        address: z.string(),
        // chain: z.string(),
        balance: z.string(),
        ens: z.string(),
        fid: z.string(),
        email: z.string().email(),
        url: z.string().url(),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your username" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Wallet Address" {...field} value={address || 'No Address Available'} className="input-field" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Balance</FormLabel>
                                <FormControl>
                                    <Input placeholder="Balance" {...field} value={Number(formatUnits(data.value, data.decimals)).toFixed(4)} className="input-field" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ens"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ENS</FormLabel>
                                <FormControl>
                                    <Input placeholder="Wallet Address" {...field} value={ens.data} className="input-field" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Farcaster Id</FormLabel>
                                <FormControl>
                                    <Input placeholder="Farcaster Id" {...field} className="input-field" disabled />
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
                                    <Input placeholder="Email" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Social Media</FormLabel>
                                <FormControl>
                                    <Input placeholder="GitHub" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default ProfileDetails