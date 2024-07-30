"use client";

import React, { useState } from "react";
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
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { useAuth } from "@/components/providers/AuthProvider";
import { useAccount } from "wagmi";
import { createProject } from "@/lib/api/projectApi";

const CreateProjectForm = () => {
  const { isAuth, isAuthLoading } = useAuth();
  const { address } = useAccount();
  const router = useRouter();

  // Form Schema for shadcn-ui form
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Project name must be at least 2 characters.",
    }),
    description: z.string(),
    projectAddress: z.string(),
    email: z.string().email(),
    instagram: z.string().optional(),
    github: z.string().optional(),
    telegram: z.string().optional(),
  });

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      projectAddress: "",
      email: "",
      instagram: "",
      github: "",
      telegram: "",
    },
  });

  // State for image upload
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle image upload
  const handleLogoImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setLogoImage(event.target.files[0]);
    }
  };

  const handleProjectImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProjectImage(event.target.files[0]);
    }
  };

  // Handle image removal
  const removeLogoImage = () => {
    setLogoImage(null);
  };

  const removeProjectImage = () => {
    setProjectImage(null);
  };

  // Handle image click to open modal
  const openModalWithImage = (image: File) => {
    setModalImage(URL.createObjectURL(image));
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const isFormValid = () => {
    return (
      form.formState.isValid && logoImage !== null && projectImage !== null
    );
  };

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!logoImage || !projectImage) {
      setErrorMessage("Please upload both logo and project image");
      return;
    }

    const formData = new FormData();
    formData.append("ownerAddress", address || "");

    // 添加表單值
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // 添加文件
    formData.append("logo", logoImage);
    formData.append("projectImage", projectImage);

    try {
      const response = await createProject(formData);
      if (response.success) {
        console.log("Project created successfully", response);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`API Error: ${error.message}`);
        setErrorMessage(
          error.message || "An error occurred while creating the project"
        );
      } else {
        console.error("An unknown error occurred");
        setErrorMessage("An unknown error occurred while creating the project");
      }
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
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <FormLabel>Logo Image</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center relative">
              {logoImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={URL.createObjectURL(logoImage)}
                    alt="Logo Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => openModalWithImage(logoImage)}
                  />
                  <button
                    type="button"
                    onClick={removeLogoImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoImageChange}
                    className="hidden"
                    id="logoImage"
                  />
                  <label
                    htmlFor="logoImage"
                    className="text-gray-400 cursor-pointer"
                  >
                    Upload your logo here, or browse
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <FormLabel>Project Image</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center relative">
              {projectImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={URL.createObjectURL(projectImage)}
                    alt="Project Image Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => openModalWithImage(projectImage)}
                  />
                  <button
                    type="button"
                    onClick={removeProjectImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProjectImageChange}
                    className="hidden"
                    id="projectImage"
                  />
                  <label
                    htmlFor="projectImage"
                    className="text-gray-400 cursor-pointer"
                  >
                    Upload your project image here, or browse
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Address</FormLabel>
              <FormControl>
                <Input placeholder="Project Address" {...field} />
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
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Instagram" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="GitHub" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Telegram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-[30px] lg:w-[10%] lg:ml-auto sm:w-[100%]"
          disabled={!isFormValid()}
        >
          Create Project
        </Button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {modalImage && (
          <div className="relative">
            <Image
              src={modalImage}
              alt="Modal Preview"
              width={800}
              height={800}
              objectFit="contain"
            />
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              X
            </button>
          </div>
        )}
      </Modal>
    </Form>
  );
};

export default CreateProjectForm;
