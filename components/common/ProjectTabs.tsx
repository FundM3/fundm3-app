import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import SponsorList from "./SponsorList";
import { Separator } from "../ui/separator";
import { Fullscreen } from "lucide-react";
import MarkdownParser from "@/components/common/MarkdownParser";

interface Props {
  projectImageUrls: string[];
  description: string;
  projectId: number;
}

const ProjectTabs: React.FC<Props> = ({
  projectImageUrls,
  description,
  projectId,
}) => {
  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10 w-full">
        <Tabs defaultValue="1">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="1">Description</TabsTrigger>
              <TabsTrigger value="2">Donor List</TabsTrigger>
            </TabsList>
          </div>
          <Separator className="my-5" />
          <TabsContent value="1">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="border-none shadow-none"
            >
              <CardContent>
                <div className="flex flex-col items-center py-[30px]">
                  {projectImageUrls.length > 0 && (
                    <div className="w-full h-30 relative mb-5">
                      <Image
                        src={projectImageUrls[0]}
                        alt="Project Image"
                        // layout="fill"
                        objectFit="cover"
                        width={1920}
                        height={600}
                        className="rounded-lg"
                      />
                    </div>
                  )}

                  {/* <p className="text-gray-700 mb-4 text-justify">
                  {description}
                  </p> */}

                  <div>
                    <MarkdownParser markdownText={description}></MarkdownParser>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Donor List</CardTitle>
                <CardDescription>
                  Recent donation from your donors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SponsorList projectId={projectId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default ProjectTabs;
