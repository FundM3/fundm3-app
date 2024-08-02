"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProfileDetail } from '@/lib/api/userApi'
import { UserProfileResponse } from '@/lib/api/userApi'
import DonateButton from '@/components/common/DonateButton'
import { EXTERNAL_URLS } from '@/lib/constants'
import ProfileTabs from '@/components/common/ProfileTabs'
import { formatDate } from '@/lib/utils/formatters'

const CreatorDetail = ({ params }: { params: { address: string } }) => {
	const [profile, setProfile] = useState<UserProfileResponse | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const address = params.address

	const fetchProfileDetail = async (address: string) => {
		setLoading(true)
		try {
			const data = await getProfileDetail(address)
			// console.log(data)
			setProfile(data)
		} catch (error) {
			setError('Failed to fetch creator details')
			// console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (address) {
		fetchProfileDetail(address)
		}
	}, [address])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	if (!profile) {
		return <p>No profile found</p>
	}

	const ownedProjects = profile.ownedProjects || [];
	const name = profile.name || "";
	const createDate = formatDate(profile.createdAt) || "";

	return (
		<>
			<section className="wrapper bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
					<div className="md:w-1/3 flex justify-center items-center p-5">
						<div className="w-60 h-60 relative">
							<Image
								src={profile.warpcastPicture || ""}
								alt={profile.name || ""}
								layout="fill"
								objectFit="cover"
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="md:w-2/3 p-5">
						<h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
						<p className="text-gray-700 mb-4">
							{profile.fid || "No Description"}
						</p>
						<div className="flex gap-4 sticky">
							<DonateButton receipientAddress={address} />
							{ profile.github != null ?
                					<Button className="bg-black text-white px-4 py-2 rounded-full">
									<Link href={`${EXTERNAL_URLS.GITHUB}${profile.github}`}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      				<path d="M12 0C5.371 0 0 5.371 0 12c0 5.022 3.053 9.283 7.372 11.135.539.1.736-.232.736-.518 0-.258-.01-1.1-.014-1.994-2.999.652-3.635-1.443-3.635-1.443-.491-1.248-1.199-1.581-1.199-1.581-.979-.669.075-.655.075-.655 1.083.076 1.653 1.112 1.653 1.112.963 1.652 2.526 1.174 3.143.899.098-.698.377-1.174.686-1.445-2.395-.273-4.919-1.197-4.919-5.333 0-1.178.422-2.14 1.114-2.894-.111-.272-.484-1.367.106-2.85 0 0 .907-.292 2.971 1.104A10.372 10.372 0 0112 6.845c.92.004 1.846.124 2.712.364 2.062-1.396 2.968-1.104 2.968-1.104.591 1.483.218 2.578.107 2.85.693.754 1.112 1.716 1.112 2.894 0 4.147-2.528 5.057-4.929 5.325.388.333.731.992.731 2v2.965c0 .288.194.624.741.518C20.949 21.277 24 17.021 24 12c0-6.629-5.371-12-12-12z" />
                    				</svg>
									</Link>
								</Button> :
                	null
              }

							{ profile.github != null ?
                <Button className="bg-black text-white px-4 py-2 rounded-full">
									<Link href={`${EXTERNAL_URLS.TELEGRAM}${profile.telegram}`}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.371 0 0 5.371 0 12c0 5.022 3.053 9.283 7.372 11.135.539.1.736-.232.736-.518 0-.258-.01-1.1-.014-1.994-2.999.652-3.635-1.443-3.635-1.443-.491-1.248-1.199-1.581-1.199-1.581-.979-.669.075-.655.075-.655 1.083.076 1.653 1.112 1.653 1.112.963 1.652 2.526 1.174 3.143.899.098-.698.377-1.174.686-1.445-2.395-.273-4.919-1.197-4.919-5.333 0-1.178.422-2.14 1.114-2.894-.111-.272-.484-1.367.106-2.85 0 0 .907-.292 2.971 1.104A10.372 10.372 0 0112 6.845c.92.004 1.846.124 2.712.364 2.062-1.396 2.968-1.104 2.968-1.104.591 1.483.218 2.578.107 2.85.693.754 1.112 1.716 1.112 2.894 0 4.147-2.528 5.057-4.929 5.325.388.333.731.992.731 2v2.965c0 .288.194.624.741.518C20.949 21.277 24 17.021 24 12c0-6.629-5.371-12-12-12z" />
                    </svg>
									</Link>
								</Button> :
                	null
              }
						</div>
					</div>
				</div>
			</section>
			
			<section className='wrapper mx-auto bg-white flex md:flex-row'>
				<ProfileTabs ownedProjects={ownedProjects} address={address} name={name} createDate={createDate} />
			</section>
		</>
	)
}

const Button = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <button className={`flex items-center justify-center ${className}`}>
      {children}
    </button>
)

export default CreatorDetail