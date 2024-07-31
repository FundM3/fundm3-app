"use client"

import React, { useEffect, useState } from 'react'
import ProjectsCard from './ProjectsCard'
import LoadMore from './LoadMore'
import Link from 'next/link'
import { getProjectList } from '@/lib/api/projectApi'
import { ProjectData } from '@/lib/api/projectApi'

interface ProjectsCollectionProps {
  limit?: number;
}

const ProjectsCollection: React.FC<ProjectsCollectionProps> = ({ limit }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjectsData = async () => {
    setLoading(true);
    try {
      const { data } = await getProjectList(1, limit || 10);
      setProjects(data);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, [limit]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {projects.map((item: ProjectData) => (
          <Link href={`/projects/${item.id}`} key={item.id}>
            <ProjectsCard key={item.id} project={item} />
          </Link>
        ))}
      </section>
      {/* <LoadMore /> */}
    </>
  )
}

export default ProjectsCollection
