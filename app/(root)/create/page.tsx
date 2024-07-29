"use client"

import CreateProjectForm from '@/components/common/CreateProjectForm'
import React from 'react'

const CreateProject = () => {
  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Create Projects</h3>
        </div>
      </section>

      <div className="wrapper my-8">
        <CreateProjectForm />
      </div>
    </>
  )
}

export default CreateProject