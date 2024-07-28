"use client"

import ProjectsCollection from '@/components/common/Projects'
import Search from '@/components/common/Search'
import SearchButton from '@/components/common/SearchButton'
import React from 'react'

const Projects = () => {
  return (
    <>
        <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className='h3-bold text-center sm:text-left'>Projects</h3>
            </div>

            <div className="wrapper flex items-center justify-center sm:justify-between w-full flex-col gap-5 md:flex-row">
              <Search />
              <SearchButton />
              
            </div>
            
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <ProjectsCollection />
            </div>
        </section>

        <section>

        </section>
    </>
  )
}

export default Projects
