"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";
import Dropdown from "./DropdownMenu";
import { useEffect, useState, useCallback } from "react";

interface CustomConnectButtonProps {
  onConnectedChange: (connected: boolean) => void;
}

export const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  onConnectedChange,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectedChange = useCallback((connected: boolean) => {
    setIsConnected(connected);
  }, []);

  useEffect(() => {
    onConnectedChange(isConnected);
  }, [isConnected, onConnectedChange]);

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
        const connected = Boolean(
          ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated")
        );

        if (connected !== isConnected) {
          handleConnectedChange(connected);
        }

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
                      className="btn text-white border-white bg-black hover:bg-yellow hover:text-black hover:border-black transition-colors duration-300 rounded-full"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                );
              }
              if (chain && chain.unsupported && chain.id === 8453) {
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
                    className="flex justify-center items-center px-3 py-1.5 mr-[5px] border border-neutral-700 bg-neutral-800/30 rounded-full font-mono font-bold cursor-pointer"
                    onClick={openAccountModal}
                  >
                    <span className="text-sm truncate">
                      {account?.displayName ?? "Connect Wallet"}
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
