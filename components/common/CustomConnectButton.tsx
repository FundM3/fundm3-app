"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { emojiAvatarForAddress } from "@/lib/utils/emojiAvatarForAddress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div>
                    <button className="btn text-white" onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  </div>
                );
              }
              if (chain && chain.unsupported) {
                return (
                  <button className="btn" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="max-w-64 w-full flex items-center justify-between text-white">
                  {/* <button className="btn mx-2" onClick={openChainModal} type="button">
                    Switch
                  </button> */}
                  <div 
                    className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl font-mono font-bold gap-x-2 cursor-pointer"
                    onClick={openAccountModal}
                  >
                    <div
                      role="button"
                      tabIndex={1}
                      className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{
                        backgroundColor: emojiAvatarForAddress(account?.address ?? "").color,
                        boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
                      }}
                    >
                      {emojiAvatarForAddress(account?.address ?? "").emoji}
                    </div>
                    <p>Account</p>
                  </div>
                  {/* <div className='mx-2'>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div> */}
                  <div className='mx-2'>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/profile" >
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <Link href="/create">
                          <DropdownMenuItem>Create Project</DropdownMenuItem>
                        </Link>
                        <Link href="/projects">
                          <DropdownMenuItem>Projects</DropdownMenuItem>
                        </Link>
                        <Link href="/creators">
                          <DropdownMenuItem>Creators</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
