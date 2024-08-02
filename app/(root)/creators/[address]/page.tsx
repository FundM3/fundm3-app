"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProfileDetail } from "@/lib/api/userApi";
import { UserProfileResponse } from "@/lib/api/userApi";
import DonateButton from "@/components/common/DonateButton";
import { EXTERNAL_URLS } from "@/lib/constants";
import ProfileTabs from "@/components/common/ProfileTabs";
import { formatDate } from "@/lib/utils/formatters";

const CreatorDetail = ({ params }: { params: { address: string } }) => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const address = params.address;

  const fetchProfileDetail = async (address: string) => {
    setLoading(true);
    try {
      const data = await getProfileDetail(address);
      // console.log(data)
      setProfile(data);
    } catch (error) {
      setError("Failed to fetch creator details");
      // console.error(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchProfileDetail(address);
    }
  }, [address]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>No profile found</p>;
  }

  const ownedProjects = profile.ownedProjects || [];
  const name = profile.name || "";
  const createDate = formatDate(profile.createdAt) || "";

  return (
    <>
      <section className="wrapper bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center items-center p-5">
            <div
              className="w-48 h-48 md:w-48 md:h-48 relative rounded-full overflow-hidden"
              style={{ border: "2px solid #cccccc" }}
            >
              {profile.warpcastPicture ? (
                <Image
                  src={profile.warpcastPicture}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <svg
                  className="w-full h-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </div>
          <div className="md:w-2/3 p-5">
            <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
            {profile.fid && (
              <div className="flex flex-row items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-6 h-6">
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
                </div>
                <p className="text-gray-700 text-base m-0">{profile.fid}</p>
              </div>
            )}
            <div className="flex gap-4 sticky">
              <DonateButton receipientAddress={address} />
              {profile.github != null && (
                <Link
                  href={`${EXTERNAL_URLS.GITHUB}${profile.github}`}
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

              {profile.fid != null && (
                <Link
                  href={`${EXTERNAL_URLS.FID}${profile.fid}`}
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

              {/* { profile.github != null ?
                <Button className="bg-black text-white px-4 py-2 rounded-full">
									<Link href={`${EXTERNAL_URLS.TELEGRAM}${profile.telegram}`}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.371 0 0 5.371 0 12c0 5.022 3.053 9.283 7.372 11.135.539.1.736-.232.736-.518 0-.258-.01-1.1-.014-1.994-2.999.652-3.635-1.443-3.635-1.443-.491-1.248-1.199-1.581-1.199-1.581-.979-.669.075-.655.075-.655 1.083.076 1.653 1.112 1.653 1.112.963 1.652 2.526 1.174 3.143.899.098-.698.377-1.174.686-1.445-2.395-.273-4.919-1.197-4.919-5.333 0-1.178.422-2.14 1.114-2.894-.111-.272-.484-1.367.106-2.85 0 0 .907-.292 2.971 1.104A10.372 10.372 0 0112 6.845c.92.004 1.846.124 2.712.364 2.062-1.396 2.968-1.104 2.968-1.104.591 1.483.218 2.578.107 2.85.693.754 1.112 1.716 1.112 2.894 0 4.147-2.528 5.057-4.929 5.325.388.333.731.992.731 2v2.965c0 .288.194.624.741.518C20.949 21.277 24 17.021 24 12c0-6.629-5.371-12-12-12z" />
                    </svg>
									</Link>
								</Button> :
                	null
              } */}
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper mx-auto bg-white flex md:flex-row">
        <ProfileTabs
          ownedProjects={ownedProjects}
          address={address}
          name={name}
          createDate={createDate}
        />
      </section>
    </>
  );
};

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <button className={`flex items-center justify-center ${className}`}>
    {children}
  </button>
);

export default CreatorDetail;
