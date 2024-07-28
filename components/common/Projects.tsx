import React from 'react'
import { data } from '@/app/_data'
import ProjectsCard, { AnimeProp } from './ProjectsCard'
import LoadMore from './LoadMore'

const ProjectsCollection = () => {
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index) => (
          <ProjectsCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      {/* <LoadMore /> */}
    </>
  )
}

export default ProjectsCollection