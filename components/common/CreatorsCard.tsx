"use client";
import React from "react";
import Image from "next/image";

const CreatorsCard = ({ profile }: any) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-xl relative w-full overflow-hidden">
      <div className="relative w-full h-[200px] overflow-hidden flex justify-center items-center bg-yellow">
        <div className="w-[150px] h-[150px] relative">
          <Image
            key={profile.warpcastPicture}
            src={profile.warpcastPicture}
            alt={profile.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="py-4 px-4 flex flex-col gap-3">
        {/* <h2 className="text-black text-xs line-clamp-1 w-full">
          {profile.address}
        </h2> */}
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-black text-xl line-clamp-1 w-full">
            {profile.name}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            {/* <span>

            </span> */}
            <p className="flex text-base text-gray-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="1000" height="1000" rx="200" fill="#855DCD" />
                <path
                  d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"
                  fill="white"
                />
                <path
                  d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"
                  fill="white"
                />
                <path
                  d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z"
                  fill="white"
                />
              </svg>
            </p>
            <p className="ml-[2px]">{profile.fid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsCard;
