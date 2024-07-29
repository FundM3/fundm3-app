"use client"

import React from 'react'
import { data_creator } from '@/app/_data'
import CreatorCard, { AnimeProp } from './CreatorsCard'
import LoadMore from './LoadMore'

interface CreatorsCollectionProps {
  limit?: number;
}

const CreatorsCollection: React.FC<CreatorsCollectionProps> = ({ limit }) => {
  const displayData = limit ? data_creator.slice(0, limit) : data_creator;

  return (
    <>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {displayData.map((item: AnimeProp, index) => (
          <CreatorCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      {/* <LoadMore /> */}
    </>
  )
}

export default CreatorsCollection