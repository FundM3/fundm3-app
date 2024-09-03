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
      <section className="wrapper bg-dotted-pattern bg-cover bg-center lg:py-10">
        <div className="lg:h-[370px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          <div className=" flex justify-center items-center lg:pl-[52px] lg:pr-[62px]">
            <div
              className="w-[330px] h-[330px] relative rounded-full overflow-hidden"
              //   style={{ border: "2px solid #cccccc" }}
            >
              {profile.warpcastPicture ? (
                <Image
                  src={profile.warpcastPicture}
                  alt="Profile Picture"
                  layout="fill"
                  className="rounded-full z-50 object-cover"
                  style={{ clipPath: "circle()" }}
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
          <div className="pt-[39px] pb-[39px] pr-[56px] max-lg:pl-[56px]">
            <div className="h-[30px] w-[124px] bg-white rounded-md overflow-hidden">
              <div className="h-[26px] w-[124px] bg-yellow rounded-md overflow-hidden">
                {
                  <p className="text-center font-medium text-[12px] py-[4px]">
                    Web developer
                  </p>
                }
              </div>
            </div>
            <div className="h-[50px] flex items-center">
              <h1
                className="font-semibold line-clamp-1"
                style={{ fontSize: "min(max(24px, 2vw), 40px)" }}
              >
                {profile.name}
              </h1>
            </div>
            <div className="h-[40px] lg:w-full bg-white overflow-hidden pt-[4px] pb-[10px]">
              {
                <p className="text-left font-light text-[16px] text-gray_text leading-tight">
                  xx Followers | xxx Sponsors | xxx Projects
                </p>
              }
            </div>
            <div className="h-[83px] w-auto overflow-hidden ">
              {
                <p className="text-left font-light text-[16px] break-all line-clamp-4 leading-tight py-[1px]">
                  test !!!! Since the success of a time-domain speech
                  separation, further improvements have been made by expanding
                  the length and channel of a feature sequence to increase the
                  amount of computation. When temporally expanded to a long
                  sequence, the feature is segmented into chunks as a dual-path
                  model in most studies of speech separation. In particular, it
                  is common for the process of separating features corresponding
                  to each speaker to be located in the final stage of the
                  network. However, it is more advantageous and intuitive to
                  proactively expand the feature sequence to include the number
                  of speakers as an extra dimension. In this paper, we present
                  an asymmetric strategy in which the encoder and decoder are
                  partitioned to perform distinct processing in separation
                  tasks. The encoder analyzes features, and the output of the
                  encoder is split into the number of speakers to be separated.
                  The separated sequences are then reconstructed by the
                  weight-shared decoder, as Siamese network, in addition to
                  cross-speaker processing. By using the Siamese network in the
                  decoder, without using speaker information, the network
                  directly learns to discriminate the features using a
                  separation objective. With a common split layer, intermediate
                  encoder features for skip connections are also split for the
                  reconstruction decoder based on the U-Net structure. In
                  addition, instead of segmenting the feature into chunks as
                  dual-path, we design global and local Transformer blocks to
                  directly process long sequences. The experimental results
                  demonstrated that this separation-and-reconstruction framework
                  is effective and that the combination of proposed global and
                  local Transformer can sufficiently replace the role of inter-
                  and intra-chunk processing in dual-path structure. Finally,
                  the presented model including both of these achieved
                  state-of-the-art performance with less computation than before
                  in various benchmark datasets.
                </p>
              }
            </div>
            <div className="flex gap-4 sticky pt-[20px]">
              <DonateButton receipientAddress={address} />

              {profile.fid != null && (
                <Link
                  href={`${EXTERNAL_URLS.FID}${profile.fid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-10 min-h-10 bg-black text-white rounded-full inline-flex items-center justify-center"
                >
                  <svg
                    version="1.1"
                    viewBox="0 0 2048 2048"
                    className="h-5 w-5"
                    width="20"
                    height="20"
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
              {profile.github != null && (
                <Link
                  href={`${EXTERNAL_URLS.GITHUB}${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-10 min-h-10 bg-black text-white rounded-full inline-flex items-center justify-center"
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
              {profile.twitter != null && (
                <Link
                  href={`${EXTERNAL_URLS.TWITTER}${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-10 min-h-10 bg-black text-white rounded-full inline-flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 18.974C16.2421 18.974 14.6366 18.9938 13.0322 18.9529C12.7901 18.9466 12.4785 18.7126 12.3274 18.491C10.9096 16.4123 9.52034 14.3132 8.12184 12.2206C8.01427 12.0597 7.90052 11.9032 7.73742 11.6701C6.68556 12.9247 5.66108 14.1448 4.63929 15.3673C3.90438 16.2466 3.11625 17.087 2.45691 18.0232C1.86042 18.8699 1.16059 19.1936 0.103335 18.8858C2.40987 16.1176 4.70677 13.3616 7.02757 10.5767C4.7006 7.08324 2.39291 3.61717 0 0.0236204C1.8076 0.0236204 3.45286 0.00455645 5.09659 0.0470532C5.30981 0.0526135 5.56777 0.338175 5.71621 0.557411C7.15211 2.68185 8.56912 4.82019 10.0201 6.99745C11.7019 4.98144 13.3862 3.02421 14.9948 1.00303C15.6167 0.221806 16.2526 -0.245658 17.3507 0.134827C15.161 2.76367 12.9736 5.38893 10.7395 8.07059C13.1359 11.6689 15.525 15.2573 18 18.9736V18.974ZM15.7166 17.794C15.6487 17.6181 15.6345 17.5446 15.5967 17.489C12.0212 12.2122 8.44612 6.93589 4.85984 1.66709C4.75111 1.50743 4.5348 1.33943 4.36013 1.3291C3.70079 1.28939 3.03759 1.31322 2.33584 1.31322C2.3744 1.45898 2.37594 1.53603 2.41141 1.58885C5.99923 6.88704 9.58743 12.1848 13.1907 17.4719C13.304 17.6379 13.5705 17.767 13.7737 17.7801C14.3917 17.8198 15.0141 17.7944 15.7166 17.7944V17.794Z" />
                  </svg>
                </Link>
              )}

              {profile.instagram != null && (
                <Link
                  href={`${EXTERNAL_URLS.INSTAGRAM}${profile.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-10 min-h-10 bg-black text-white rounded-full inline-flex items-center justify-center"
                >
                  <Image
                    src="/assets/logos/instagram.svg"
                    alt="instagram Logo"
                    width={20}
                    height={20}
                    className=""
                  />
                </Link>
              )}

              {profile.telegram != null && (
                <Link
                  href={`${EXTERNAL_URLS.TELEGRAM}${profile.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-10 min-h-10 bg-black text-white rounded-full inline-flex items-center justify-center"
                >
                  <Image
                    src="/assets/logos/telegram.svg"
                    alt="telegram Logo"
                    width={20}
                    height={20}
                    className=""
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper mx-auto bg-white flex lg:flex-row">
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
