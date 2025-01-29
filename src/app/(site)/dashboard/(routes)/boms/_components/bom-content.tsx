"use client"

import { useEffect } from "react";
import { onGetBom } from '@/actions/bom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BomForm from './bom-form';
import BomLineContent from './bom-line-content';
import ItemsContent from './items-content';
import useSettingStore from '@/hooks/use-setting-store';
import useBomStore from '@/hooks/use-bom-store';

export default function BomContent() {
  const params = useParams();
  const { id } = params;
  const { setFilter } = useBomStore()
  const { setting: { countryCode } } = useSettingStore()

  var filter = { id: Number(id), countryCode: countryCode }

  const { data, isFetched } = useQuery({
    queryKey: ["bom", id],
    queryFn: async () => { return onGetBom(filter) },
  })

  useEffect(() => {
    if (data) {
      setFilter(filter)
    }
  }, [data]);

  if (!isFetched) return <div>Loading...</div>
  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <BomForm bom={data} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <BomLineContent bom={data} />
        <ItemsContent bom={data} />
      </div>
    </div>
  )
}
