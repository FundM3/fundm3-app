"use client"

import React, { useEffect, useState } from 'react'
import CreatorCard from './CreatorsCard'
import Link from 'next/link'
import { getProfileList } from '@/lib/api/userApi'
import { ProfileData } from '@/lib/api/userApi'

interface CreatorsCollectionProps {
  limit?: number;
}

const CreatorsCollection: React.FC<CreatorsCollectionProps> = ({ limit }) => {
  // const displayData = limit ? data_creator.slice(0, limit) : data_creator;

  const [profile, setProfile] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfilesData = async () => {
    setLoading(true);
    try {
      const { data } = await getProfileList(1, limit || 10);
      setProfile(data);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfilesData();
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
        {profile.map((item: ProfileData) => (
          <Link href={`/creators/${item.address}`} key={item.id}>
            <CreatorCard key={item.address} profile={item} />
          </Link>
        ))}
      </section>
    </>
  )
}

export default CreatorsCollection