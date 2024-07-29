"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useAuth } from '@/components/providers/AuthProvider'
import { updateProfile, fetchProfileDetails } from '@/app/api'
import { EXTERNAL_URLS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'


const ProfileDetails = () => {
	const { isAuth, isAuthLoading } = useAuth();
	const { address } = useAccount();
	const [isEditMode, setIsEditMode] = useState(false);
	const [profileData, setProfileData] = useState(null);
	const profilePictureRef = useRef(null);

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}).optional(),
		address: z.string(), // Read-only field
		fid: z.number().int().positive().nullable().optional(), // Read-only field
		email: z.string().email().optional(),
		instagram: z.string().optional(),
		github: z.string().optional(),
		telegram: z.string().optional()
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			address: "",
			fid: null,
			email: "",
			instagram: "",
			github: "",
			telegram: ""
		},
	});

	useEffect(() => {
		const fetchProfile = async () => {
			if (isAuth && address) {
				try {
					const data = await fetchProfileDetails(address);
					setProfileData(data);
					form.reset(data);
					profilePictureRef.current = data.warpcastPicture || "";
				} catch (error) {
					console.error("Failed to fetch profile data:", error);
				}
			}
		};

		fetchProfile();
	}, [isAuth, address, form]);

	const handleEditClick = () => {
		setIsEditMode(true);
	};

	const handleCancelClick = () => {
		form.reset(profileData || {});
		setIsEditMode(false);
	};

	const onSubmit = async (values: any) => {
		console.log('Submitting form with values:', values);
		try {
			await updateProfile(values);
			console.log('values', values);
			setProfileData(values);
			setIsEditMode(false);
		} catch (error) {
			console.error("Failed to update profile:", error);
		}
	};

	const renderUnauthenticated = () => (
		<div>
			<h2>Please Connect Wallet & Sign In</h2>
		</div>
	);

	if (isAuthLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuth) {
		return renderUnauthenticated();
	}

	return (
		<div >
			<div className="mb-6 flex justify-center">
				{profilePictureRef.current ? (
					<Image
						src={profilePictureRef.current}
						alt="Profile Picture"
						width={100}
						height={100}
						className="rounded-full"
					/>
				) : (
					<div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
						<span className="text-gray-500 text-center">No Profile Image</span>
					</div>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="flex flex-col gap-5">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input
											placeholder="Wallet Address"
											{...field}
											className="input-field"
											disabled
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Your username"
											{...field}
											className="input-field"
											disabled={!isEditMode}
										/>
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
										<Input
											placeholder="Email"
											{...field}
											className="input-field"
											disabled={!isEditMode}
										/>
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
									<div className="flex items-center gap-2">
										<FormControl className="flex-grow">
											<Input
												placeholder="Farcaster Id"
												{...field}
												value={field.value || ''}
												className="input-field"
												disabled
											/>
										</FormControl>
										{!isEditMode && field.value && field.value > 0 && (
											<Link href={`${EXTERNAL_URLS.WARPCAST}${field.value}`} target="_blank" className="whitespace-nowrap">
												Link
											</Link>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="instagram"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instagram</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl className="flex-grow">
											<Input
												placeholder="Instagram Username"
												{...field}
												className="input-field"
												disabled={!isEditMode}
											/>
										</FormControl>
										{!isEditMode && field.value && (
											<Link href={`${EXTERNAL_URLS.INSTAGRAM}${field.value}`} target="_blank" className="whitespace-nowrap">
												Link
											</Link>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="github"
							render={({ field }) => (
								<FormItem>
									<FormLabel>GitHub</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl className="flex-grow">
											<Input
												placeholder="GitHub Username"
												{...field}
												className="input-field"
												disabled={!isEditMode}
											/>
										</FormControl>
										{!isEditMode && field.value && (
											<Link href={`${EXTERNAL_URLS.GITHUB}${field.value}`} target="_blank" className="whitespace-nowrap">
												Link
											</Link>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="telegram"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telegram</FormLabel>
									<div className="flex items-center gap-2">
										<FormControl className="flex-grow">
											<Input
												placeholder="Telegram Username"
												{...field}
												className="input-field"
												disabled={!isEditMode}
											/>
										</FormControl>
										{!isEditMode && field.value && (
											<Link href={`${EXTERNAL_URLS.TELEGRAM}${field.value}`} target="_blank" className="whitespace-nowrap">
												Link
											</Link>
										)}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{isEditMode ? (
						<div className="flex gap-3">
							<Button type="submit">Save</Button>
							<Button type="button" onClick={handleCancelClick}>Cancel</Button>
						</div>
					) : (
						<Button type="button" onClick={handleEditClick}>Edit</Button>
					)}
				</form>
			</Form>
		</div>
	);
};

export default ProfileDetails;
