"use client"
import React from 'react'
import Image from "next/image"

const CreatorProjectCard = ({ profile }: any) => {
    return (
      <div className="max-w-sm rounded-2xl shadow-lg relative w-full overflow-hidden">
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={profile.details.logoUrl}
            alt={profile.logoUrl}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
        <div className="py-4 px-4 flex flex-col gap-3">
          <h2 className="text-black text-xs line-clamp-1 w-full">
            {profile.projectName}
          </h2>
          <div className="flex justify-between items-center gap-1">
            <h2 className="font-bold text-black text-xl line-clamp-1 w-full">
              {profile.name}
            </h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
                <p className="text-base text-gray-500">
                    {profile.createDate}
                </p>
            </div>
            </div>
        </div>
      </div>
    )
  }

export default CreatorProjectCard
