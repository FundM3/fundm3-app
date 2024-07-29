"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Search from "@/components/common/Search";
import Filter from "@/components/common/Filter";
import SearchButton from "@/components/common/SearchButton";
import { Separator } from "@/components/ui/separator";
import ProjectsCollection from "@/components/common/Projects";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <section className="bg-custom-pattern bg-center bg-yellow bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Empower Dreams, Fuel Change</h1>
            <p className="p-regular-20 md:p-regular-24">Join a community of change makers on FundM3. Together, we can build a brighter future for all</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/projects">
                Explore More
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <Filter />
          <SearchButton />
        </div>

        <h2 className="h2-bold">Features Projects</h2>
        <Separator />
        <ProjectsCollection limit={8} />

        <h2 className="h2-bold">Features Creators</h2>
        <Separator />
      </section>
    </>
  );
}
