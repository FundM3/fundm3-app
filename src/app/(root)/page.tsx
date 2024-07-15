"use client";

import Image from "next/image";
import { ConnectBtn } from "../../components/common/connectButton";
import Profile from "../../components/common/profile";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Profile />
    </main>
  );
}