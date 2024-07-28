import React from 'react'
import { data } from '@/app/_data'
import ProjectsCard, { AnimeProp } from './ProjectsCard'
import LoadMore from './LoadMore'

interface ProjectsCollectionProps {
  limit?: number;
}

const ProjectsCollection: React.FC<ProjectsCollectionProps> = ({ limit }) => {
  const displayData = limit ? data.slice(0, limit) : data;

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {displayData.map((item: AnimeProp, index) => (
          <ProjectsCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      {/* <LoadMore /> */}
    </>
  )
}

export default ProjectsCollection