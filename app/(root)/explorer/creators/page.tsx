"use client"

import Search from '@/components/common/Search'
import React from 'react'

const Creators = () => {
  return (
    <>
        <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className='h3-bold text-center sm:text-left'>Creators</h3>
            </div>

            <div className="wrapper flex items-center justify-center sm:justify-between">
                <Search />
            </div>
        </section>
    </>
  )
}

export default Creators
