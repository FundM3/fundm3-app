"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectData } from "@/lib/api/projectApi";
import { formatDate } from "@/lib/utils/formatters";

interface ProjectsCardProps {
  project: ProjectData;
}

const ProjectsCard = ({ project }: ProjectsCardProps) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-lg relative w-full overflow-hidden">
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          key={`${project.logoUrl}`}
          src={project.logoUrl}
          alt={project.logoUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>
      <div className="py-4 px-4 flex flex-col gap-3">
        <h2 className="text-black text-xs line-clamp-1 w-full">
          {project.ownerName}
        </h2>
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-black text-xl line-clamp-1 w-full">
            {project.name}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-gray-500">
              {formatDate(project.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
