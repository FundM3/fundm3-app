"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectTabs from "@/components/common/ProjectTabs";
import DonateButton from "@/components/common/DonateButton";
import { getProjectDetail } from "@/lib/api/projectApi";
import { ProjectResponse } from "@/lib/api/projectApi";
import { Button } from "@/components/ui/button";
import { EXTERNAL_URLS } from "@/lib/constants";

const ProjectDetail = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const id = params.id;

  const fetchProjectDetail = async (id: number) => {
    setLoading(true);
    try {
      const data = await getProjectDetail(id);
      setProject(data);
    } catch (error) {
      setError("Failed to fetch project details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetail(Number(id));
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>No project found</p>;
  }

  const projectImageUrls = [project.details.logoUrl]
  const projectId = project.id
  
  return (
    <>
      <section className="wrapper bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center items-center p-5">
            <div className="w-60 h-60 relative">
              <Image
                src={project.details.logoUrl}
                alt={project.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-5">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="text-gray-700 mb-4 text-justify">
              {project.description || "No Description"}
            </p>
            <div className="flex gap-4">
              <DonateButton receipientAddress={project.address} />
              {project.details.github != null && (
                <Link
                  href={`${EXTERNAL_URLS.GITHUB}${project.details.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-full inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
              )}
              {/* {project.details.telegram != null && (
                <Link
                  href={`${EXTERNAL_URLS.TELEGRAM}${project.details.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-full inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </Link>
              )}
              {project.details.instagram != null && (
                <Link
                  href={`${EXTERNAL_URLS.INSTAGRAM}${project.details.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-full inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Link>
              )} */}
              {project.fid != null && (
                <Link
                  href={`${EXTERNAL_URLS.FID}${project.fid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-full inline-flex items-center"
                >
                  <svg
                    version="1.1"
                    viewBox="0 0 2048 2048"
                    className="h-5 w-5"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      transform="translate(0)"
                      d="m0 0h2048v2048h-2048z"
                      fill="#000000"
                    />
                    <path
                      transform="translate(308,512)"
                      d="m0 0h323l3 7 13 48 52 195 17 63 11 42 18 67 10 36 2 5h1l5-22 27-101 19-71 22-82 24-90 22-82 5-15h282l3 3 8 29 40 150 20 74 11 42 12 44 11 42 16 59 5 17 2-6 18-68 12-45 21-79 44-165 19-72 7-24 1-1h323l-2 10-23 79-23 78-17 58-25 85-17 58-45 153-41 140-45 153-17 58-15 51-26 88-4 12-2 1h-277l-3-5-15-52-15-54-20-71-16-57-23-82-15-53-18-64-10-34-2-1-1 8-11 40-14 50-20 71-16 57-15 53-21 75-17 60-14 49-3 9-2 1h-276l-3-4-9-29-23-79-18-61-23-78-25-85-41-139-20-68-17-58-40-136-23-78-17-58-16-54-18-61-10-34z"
                      fill="#FEFEFE"
                    />
                    <path
                      transform="translate(0)"
                      d="m0 0h2048v2048h-2048zm6 3-2 1-1 87v1914l1 39 40 1h1928l71-1 1-1 1-598v-1385l-1-56-5-1z"
                      fill="#080106"
                    />
                  </svg>
                </Link>
              )}
              <Link
                href={`${EXTERNAL_URLS.CAST}text=Donate ${project.name}&embeds[]=${EXTERNAL_URLS.FRAME}/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Warpcast
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className='wrapper mx-auto bg-white flex md:flex-row'>
        <ProjectTabs description={project.description || "No Description"} projectImageUrls={projectImageUrls} projectId={projectId} />
      </section>
    </>
  );
};

export default ProjectDetail;
