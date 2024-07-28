import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ExplorerTabs = () => {

  return (
    <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">Projects</TabsContent>
        <TabsContent value="creators">Creators</TabsContent>
    </Tabs>
  )
}

export default ExplorerTabs