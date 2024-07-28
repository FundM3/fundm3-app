"use client"

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { CustomConnectButton } from './CustomConnectButton'

const Header = () => {
  return (
    <header className='w-full border-b bg-black'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/">
                <Image 
                    src="/assets/logos/logo.svg"
                    alt='FundM3 Logo'
                    width={128}
                    height={38}
                />
            </Link>

            <Link href="/create" className="text-white hover:bg-yellow ml-auto mr-[10px]">
              Create Project
            </Link>
            
            <CustomConnectButton />
        </div>
    </header>
  )
}

export default Header
