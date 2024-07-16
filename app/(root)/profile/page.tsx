"use client"

import ProfileDetails from '@/components/common/ProfileDetails'
import React from 'react'

const Profile = () => {
    return (
        <>
            <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left'>User Profile Edit</h3>
                </div>
            </section>

            <div className="wrapper my-8">
                <ProfileDetails />
            </div>
        </>
    )
}

export default Profile