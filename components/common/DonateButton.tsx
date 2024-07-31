/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FbxA3tKCB02
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Spinner from "./Spinner"

export default function DonateButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        setIsSuccess(null)
    
        setTimeout(() => {
          const isSuccess = Math.random() > 0.5
          setIsSuccess(isSuccess)
          setIsLoading(false)
        }, 2000)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black text-white px-4 py-2 rounded-full">Sponsor Me</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {isLoading ? (
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="loader" /> {/* 可以用一个实际的加载动画组件 */}
                    <DialogTitle className="text-2xl font-bold mt-4">Processing...</DialogTitle>
                    <Spinner />
                </div>
                ) : isSuccess !== null ? (
                <div className="flex flex-col items-center justify-center p-6">
                    {isSuccess ? (
                    <>
                        <DialogTitle className="text-2xl font-bold mt-4">Success!</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                        Your donation was successful.
                        </DialogDescription>
                    </>
                    ) : (
                    <>
                        <DialogTitle className="text-2xl font-bold mt-4">Failure</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                        There was an error processing your donation.
                        </DialogDescription>
                    </>
                    )}
                    <DialogClose asChild>
                    <Button className="mt-4">Close</Button>
                    </DialogClose>
                </div>
                ) : (
                <div className="flex flex-col gap-4 p-6">
                    <div className="space-y-2">
                    <DialogTitle className="text-2xl font-bold">Donate with Crypto</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Enter your the amount you&apos;d like to pay.
                    </DialogDescription>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="wallet">Wallet Address</Label>
                        <Input id="wallet" placeholder="0x123456789..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                    </div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    </form>
                    <DialogClose asChild>
                    <Button variant="ghost" className="absolute top-4 right-4 rounded-full p-1 hover:bg-muted">X</Button>
                    </DialogClose>
                </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }