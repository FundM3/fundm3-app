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
import SponsorListProfile from './SponsorListProfile'
import { Separator } from '../ui/separator'

interface Props {
  address: string;
}

const ProjectTabs: React.FC<Props> = ({ address }) => {
    return (
    <>
      <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 w-full'>
        <Tabs defaultValue="1">
          <div className="flex items-center">
              <TabsList>
                  <TabsTrigger value="1">Project</TabsTrigger>
                  <TabsTrigger value="2">Donator List</TabsTrigger>
              </TabsList>
          </div>
          <Separator className="my-5" />
          <TabsContent value="1">
          </TabsContent>
          <TabsContent value="2">
              <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Donator List</CardTitle>
                    <CardDescription>
                        Recent donation from your donators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SponsorListProfile donorAddress={address} />
                  </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

export default ProjectTabs
