"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useAuth } from "@/components/providers/AuthProvider";
import { EXTERNAL_URLS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import {
  getProfileDetail,
  updateProfile,
  UserProfileResponse,
} from "@/lib/api/userApi";

const formSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters.").nullable(),
  address: z.string(),
  fid: z.number().int().positive().nullable(),
  email: z.string().email().nullable(),
  instagram: z.string().nullable(),
  github: z.string().nullable(),
  telegram: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileDetails = () => {
  const { isAuth, isAuthLoading } = useAuth();
  const { address } = useAccount();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileResponse | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: null,
      address: "",
      fid: null,
      email: null,
      instagram: null,
      github: null,
      telegram: null,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuth && address) {
        try {
          const data = await getProfileDetail(address);
          setProfileData(data);
          form.reset(data);
          setProfilePicture(data.warpcastPicture ?? null);
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      }
    };

    fetchProfile();
  }, [isAuth, address, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const { fid, ...updateValues } = values;
      const updatedProfile = await updateProfile(updateValues);
      setProfileData(updatedProfile);
      setErrorMessage(null);
      setIsEditMode(false);
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while updating the profile"
      );
    }
  };

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <h2>Please Connect Wallet & Sign In</h2>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-center">
        {profilePicture ? (
          <Image
            src={profilePicture}
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
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Form fields */}
          {[
            "address",
            "name",
            "email",
            "fid",
            "@instagram_handle",
            "@github_handle",
            "@telegram_handle",
          ].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl className="flex-grow">
                      <Input
                        placeholder={`${
                          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                        }`}
                        {...field}
                        value={field.value || ""}
                        className="input-field"
                        disabled={
                          fieldName === "address" ||
                          fieldName === "fid" ||
                          !isEditMode
                        }
                      />
                    </FormControl>
                    {!isEditMode &&
                      field.value &&
                      ["fid", "instagram", "github", "telegram"].includes(
                        fieldName
                      ) && (
                        <Link
                          href={`${EXTERNAL_URLS[fieldName.toUpperCase()]}${
                            field.value
                          }`}
                          target="_blank"
                          className="whitespace-nowrap"
                        >
                          Link
                        </Link>
                      )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {isEditMode ? (
            <div className="flex gap-3">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                onClick={() => {
                  form.reset(profileData || {});
                  setErrorMessage(null);
                  setIsEditMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetails;