import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import SponsorList from './SponsorList'
import { Separator } from '../ui/separator'

interface Props {
  projectImageUrls: string[];
  description: string;
}

const ProjectTabs = () => {
  return (
    <>
      <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 w-full'>
        <Tabs defaultValue="1">
          <div className="flex items-center">
              <TabsList>
                  <TabsTrigger value="1">Description</TabsTrigger>
                  <TabsTrigger value="2">Sponsor List</TabsTrigger>
              </TabsList>
          </div>
          <Separator className="my-5" />
          <TabsContent value="1">
            <Card x-chunk="dashboard-05-chunk-1" className='border-none shadow-none'>
              <CardContent>
                <div className="flex flex-col items-center px-[30px] py-[30px]">
                  <div className="w-full h-80 relative mb-5">
                    <Image
                      src="/assets/images/FundM3-Logo-02.jpg"
                      alt="Project Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2">
              <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Sponsor List</CardTitle>
                    <CardDescription>
                        Recent sponsor from your donators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SponsorList />
                  </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

export default ProjectTabs