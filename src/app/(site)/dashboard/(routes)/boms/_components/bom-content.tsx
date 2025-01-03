"use client"

import { onGetBom } from '@/actions/bom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import BomForm from './bom-form';
import BomLineContent from './bom-line-content';
import ItemsContent from './items-content';

export default function BomContent() {
  const [country, setCountry] = useState(0);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setCountry(Number(localStorage.getItem('user-country-code') as string))
    refetch
  }, []);

  var filter = {
    id: Number(id),
    countryCode: country
  }

  const { data, refetch } = useQuery({
    queryKey: ['bom', filter],
    queryFn: async () => { return onGetBom(filter) },
    enabled: country > 0
  })

  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <BomForm bom={data?.bomById} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <BomLineContent bom={data?.bomById} />
        <ItemsContent bom={data?.bomById} />
      </div>
    </div>
  )
}
