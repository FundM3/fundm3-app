import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { ConnectBtn } from './connectButton'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/">
                <Image 
                    src="/assets/images/FundM3-Logo-01.jpg"
                    alt='FundM3 Logo'
                    width={128}
                    height={38}
                />
            </Link>
            <ConnectBtn />
        </div>
    </header>
  )
}

export default Header