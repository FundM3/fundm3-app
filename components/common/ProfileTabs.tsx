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
import ProjectsCard from './ProjectsCard'

interface Props {
    ownedProjects?: Project[];
}

const ProfileTabs: React.FC<Props> = ({ ownedProjects }) => {
    // console.log(ownedProjects)
    return (
        <>
        <section className='bg-dotted-pattern bg-cover bg-center py-5 md:py-10 w-full'>
            <Tabs defaultValue="1">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="1">Projects</TabsTrigger>
                    <TabsTrigger value="2">Donator List</TabsTrigger>
                </TabsList>
            </div>
            <Separator className="my-5" />
            <TabsContent value="1">
                {/* <ProjectsCard /> */}
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
                        <SponsorList />
                    </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </section>
        </>
    )
}

export default ProfileTabs
