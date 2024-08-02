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
            <p className="mt-5 text-justify">
              For showcasing projects, aiming to build a communication bridge between developers and sponsors, 
              thereby promoting the development and realization of public goods projects. 
              This page not only displays current popular projects but also reserves space for future new projects, 
              providing developers with a stage to showcase their creativity and achievements.
            </p>
          </div>

          <div className="wrapper flex items-center justify-center sm:justify-between w-full flex-col gap-5 md:flex-row">
            <Search />
            <SearchButton />
          </div>
          
          <div className="wrapper items-center justify-center sm:justify-between">
            <ProjectsCollection />
          </div>
      </section>
    </>
  )
}

export default Projects
