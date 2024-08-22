"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Spinner from "./Spinner";
import { parseEther } from "viem";
import {
  useConnect,
  useAccount,
  useWriteContract,
  useConnections,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "viem/chains";

interface Props {
  receipientAddress: string;
}

export default function DonateButton({ receipientAddress }: Props) {
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const connections = useConnections();
  const isConnect = connections.length > 0 ? true : false;

  useEffect(() => {
    if (address) {
      setButtonText("Submit");
    } else {
      setButtonText("Connect Wallet");
    }
  }, [address]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors("");
      setStarted(true);
      setIsLoading(true);

      if (!address) {
        await connectAsync({ chainId: baseSepolia.id, connector: injected() });
        return;
      }

      if (
        !receipientAddress ||
        typeof receipientAddress !== "string" ||
        !receipientAddress.startsWith("0x")
      ) {
        throw new Error("Invalid recipient address");
      }

      const validRecipientAddress = receipientAddress as `0x${string}`;

      const data = await writeContractAsync({
        chainId: baseSepolia.id,
        address: "0xD12Ad3de4a549e0Eb32c81790501d6DFE186606D", // Contract Address
        functionName: "donate",
        abi: [
          {
            inputs: [
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            name: "donate",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ],
        args: [validRecipientAddress],
        value: parseEther(amount),
      });
      setCompleted(true);
      setIsSuccess(true);
      // console.log(data);
    } catch (err) {
      // console.log(err);
      setStarted(false);
      setIsSuccess(false);
      setErrors("Donate failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(null);
    setIsLoading(false);
    setStarted(false);
    setCompleted(false);
    setErrors("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleReset}>
        <Button className="bg-black text-white px-4 py-2 rounded-full">
          Sponsor Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="loader" />
            <DialogTitle className="text-2xl font-bold mt-4 mb-[25px]">
              Processing...
            </DialogTitle>
            <Spinner />
          </div>
        ) : isSuccess !== null ? (
          <div className="flex flex-col items-center justify-center p-6">
            {isSuccess ? (
              <>
                <DialogTitle className="text-2xl font-bold mt-4 mb-[20px]">
                  Success!
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Your donation was successful.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle className="text-2xl font-bold mt-4 mb-[20px]">
                  Failure
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mb-[20px]">
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
              <DialogTitle className="text-2xl font-bold">
                Donate with Crypto
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter the amount you&apos;d like to pay.
              </DialogDescription>
            </div>
            <form className="space-y-4" onSubmit={handlePayment}>
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  id="receipientAddress"
                  value={receipientAddress}
                  disabled
                />
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
                disabled={(!amount && !address) || started}
              >
                {started || isConnect ? "Donate" : buttonText}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
