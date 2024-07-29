"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import * as z from "zod"
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import Modal from 'react-modal'

const CreateProjectForm = () => {
  // Form Schema for shadcn-ui form
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    url: z.string().url(),
    github: z.string().url(),
    description: z.string(),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // State for image upload
  const [logoImage, setLogoImage] = useState<File | null>(null)
  const [otherImage, setOtherImage] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)

  // Handle image upload
  const handleLogoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoImage(event.target.files[0])
    }
  }

  const handleOtherImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setOtherImage(event.target.files[0])
    }
  }

  // Handle image removal
  const removeLogoImage = () => {
    setLogoImage(null)
  }

  const removeOtherImage = () => {
    setOtherImage(null)
  }

  // Handle image click to open modal
  const openModalWithImage = (image: File) => {
    setModalImage(URL.createObjectURL(image))
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setModalImage(null)
  }
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    console.log(logoImage)
    console.log(otherImage)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                  <input type="file" accept="image/*" onChange={handleLogoImageChange} className="hidden" id="logoImage" />
                  <label htmlFor="logoImage" className="text-gray-400 cursor-pointer">
                    Upload your image here, or browse
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-1/2">
            <FormLabel>Other Image</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center relative">
              {otherImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={URL.createObjectURL(otherImage)}
                    alt="Other Image Preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer"
                    onClick={() => openModalWithImage(otherImage)}
                  />
                  <button
                    type="button"
                    onClick={removeOtherImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              ) : (
                <>
                  <input type="file" accept="image/*" onChange={handleOtherImageChange} className="hidden" id="otherImage" />
                  <label htmlFor="otherImage" className="text-gray-400 cursor-pointer">
                    Upload your image here, or browse
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your project name" {...field} className="input-field" />
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
                    <Input placeholder="Social Media" {...field} className="input-field" />
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
                  <FormLabel>GitHub Link</FormLabel>
                  <FormControl>
                    <Input placeholder="GitHub" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl h-[90%]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit" className="mt-[30px] lg:w-[10%] lg:ml-auto sm:w-[100%]">Submit</Button>
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
            <Image src={modalImage} alt="Modal Preview" width={800} height={800} objectFit="contain" />
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
  )
}

export default CreateProjectForm
