"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Project } from '@/lib/api/userApi';
import CreatorProjectCard from './CreatorProjectCard'

interface CreatorsProjectCollectionProps {
  limit?: number;
  ownedProjects?: Project[];
  name: string;
  createDate: string;
}

const CreatorsProjectCollection: React.FC<CreatorsProjectCollectionProps> = ({ limit, ownedProjects, name, createDate }) => {
  const projectName = name
  const projects = ownedProjects?.map((project) => ({
    ...project,
    projectName,
    createDate
  }))
  
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {projects?.map((item: Project) => (
          <Link href={`/projects/${item.id}`} key={item.id}>
            <CreatorProjectCard key={item.address} profile={item} />
          </Link>
        ))}
      </section>
    </>
  )
}

export default CreatorsProjectCollection
