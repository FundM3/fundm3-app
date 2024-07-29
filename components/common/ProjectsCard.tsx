"use client"

import React from 'react'
import Image from "next/image"

export interface AnimeProp {
    id: string;
    name: string;
    image: {
      original: string;
    };
    kind: string;
    episodes: number;
    episodes_aired: number;
    score: string;
}
  
interface Prop {
    anime: AnimeProp;
    index: number;
}

const ProjectsCard = ({ anime }: Prop) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-lg relative w-full overflow-hidden">
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={anime.image.original}
          alt={anime.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>
      <div className="py-4 px-4 flex flex-col gap-3">
        <h2 className="text-black text-xs line-clamp-1 w-full">
          {anime.name}
        </h2>
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-black text-xl line-clamp-1 w-full">
            {anime.name}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-gray-500">
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsCard