"use client"

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Spinner from "./Spinner"
import { 
    type BaseError, 
    useSendTransaction, 
    useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem'

interface Props {
    address: string
}

export default function DonateButton({ address }: Props) {
    const [amount, setAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

    // const { 
    //     data: hash,
    //     error, 
    //     isPending, 
    //     sendTransaction 
    // } = useSendTransaction() 

    // console.log(error)

    console.log(address)

    const { sendTransaction } = useSendTransaction()

    console.log(sendTransaction)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        setIsSuccess(null)

        // const transaction = await sendTransaction.sendTransaction()
        // if (transaction) {
        //     const receipt = await transaction.wait()
        //     if (receipt.status === 1) {
        //         setIsSuccess(true)
        //     } else {
        //         setIsSuccess(false)
        //     }
        // }
        // setIsLoading(false)
    }

    // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt(
    //     {  hash, }
    // ) 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black text-white px-4 py-2 rounded-full">Sponsor Me</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-6">
                        <div className="loader" />
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
                                Enter the amount you&apos;d like to pay.
                            </DialogDescription>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="wallet">Wallet Address</Label>
                                <Input id="address" value={address} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input 
                                    id="amount" 
                                    placeholder="Base Sepolia ETH" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full"
                                // onClick={handleSubmit}
                                disabled={!sendTransaction}
                                onClick={() =>
                                    sendTransaction({
                                      to: `0x${address}`,
                                      value: parseEther('0.01'),
                                    })
                                }
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
