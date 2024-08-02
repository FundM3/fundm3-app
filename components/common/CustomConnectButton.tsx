"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { emojiAvatarForAddress } from "@/lib/utils/emojiAvatarForAddress";
import { Button } from "../ui/button";
import Dropdown from "./DropdownMenu";
import { useEffect, useState } from "react";

export const CustomConnectButton = ({ onConnectedChange }) => {
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
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        useEffect(() => {
          onConnectedChange(connected);
        }, [connected, onConnectedChange]);

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div>
                    <Button
                      className="btn text-white  border-white bg-black hover:bg-yellow hover:text-black hover:border-black transition-colors duration-300 rounded-full"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                );
              }
              if (chain && chain.unsupported && chain.id == 8453) {
                return (
                  <button
                    className="btn"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="max-w-64 w-full flex items-center justify-between text-white">
                  <div
                    className="flex justify-center items-center px-3 py-1.5 border border-neutral-700 bg-neutral-800/30 rounded-full font-mono font-bold cursor-pointer"
                    onClick={openAccountModal}
                  >
                    {/* <div
                      role="button"
                      tabIndex={1}
                      className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden mr-2"
                      style={{
                        backgroundColor: emojiAvatarForAddress(
                          account?.address ?? ""
                        ).color,
                        boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
                      }}
                    >
                      {emojiAvatarForAddress(account?.address ?? "").emoji}
                    </div> */}
                    <span className="text-sm truncate">
                      {account.displayName}
                    </span>
                  </div>
                  <div className="ml-2">
                    <Dropdown />
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
