import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

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
        </div>
    </header>
  )
}

export default Header