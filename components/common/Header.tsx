"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { CustomConnectButton } from "./CustomConnectButton";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="w-full border-b bg-black">
      <div className="wrapper flex items-center justify-between h-20">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/assets/logos/logo.svg"
            alt="FundM3 Logo"
            width={128}
            height={38}
          />
        </Link>

        <div className="flex items-center h-full">
          {isConnected && (
            <Link
              href="/create"
              className="text-white hover:text-yellow px-5 h-full flex items-center"
            >
              Create
            </Link>
          )}
          <CustomConnectButton onConnectedChange={setIsConnected} />
        </div>
      </div>
    </header>
  );
};

export default Header;
