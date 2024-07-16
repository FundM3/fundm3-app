"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Search from "@/components/common/Search";
import Filter from "@/components/common/Filter";

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
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Empower Dreams, Fuel Change</h1>
            <p className="p-regular-20 md:p-regular-24">Join a community of change makers on FundM3. Together, we can build a brighter future for all</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/projects">
                Explore Now
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
        <h2 className="h2-bold">Explore <br /> Projects or Creators </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <Filter />
        </div>

        {/* <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        /> */}
      </section>
    </>
  );
}
