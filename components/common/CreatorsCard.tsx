"use client"
import React from 'react'
import Image from "next/image"

const CreatorsCard = ({ profile }: any) => { 
  return (
    <div className="max-w-sm rounded-2xl shadow-xl relative w-full overflow-hidden">
      <div className="relative w-full h-[200px] overflow-hidden flex justify-center items-center bg-yellow">
        <div className="w-[150px] h-[150px] relative">
          <Image
            src={profile.warpcastPicture}
            alt={profile.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="py-4 px-4 flex flex-col gap-3">
        <h2 className="text-black text-xs line-clamp-1 w-full">
          {profile.address}
        </h2>
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-black text-xl line-clamp-1 w-full">
            {profile.name}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-base text-gray-500">
              {profile.fid}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorsCard
