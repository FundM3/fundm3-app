"use client"

import ProjectsCollection from '@/components/common/Projects'
import Search from '@/components/common/Search'
import SearchButton from '@/components/common/SearchButton'
import React from 'react'

const Projects = () => {
  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex flex-col justify-center sm:justify-between">
            <h3 className='h3-bold text-left sm:text-left'>Projects</h3>
            <p className="mt-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="wrapper flex items-center justify-center sm:justify-between w-full flex-col gap-5 md:flex-row">
            <Search />
            <SearchButton />
          </div>
          
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <ProjectsCollection />
          </div>
      </section>
    </>
  )
}

export default Projects
