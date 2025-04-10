"use client"

import { useEffect } from "react";
import { onGetBom } from '@/actions/bom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BomForm from './bom-form';
import BomLineContent from '@/components/bom-line-table/bom-line-content';
import ItemsContent from '@/components/items-table/items-content';
import useSettingStore from '@/store/use-setting-store';
import useBomStore from '@/hooks/use-bom-store';
import { BomDetailFilter } from "@/types";

export default function BomContent() {
  const params = useParams();
  const { id } = params;
  const { setFilter } = useBomStore()
  const { setting: { countryCode } } = useSettingStore()

  var filter: BomDetailFilter = { id: Number(id), countryCode: countryCode }

  const { data, isFetched } = useQuery({
    queryKey: ["bom", filter.id.toString()],
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
        <ItemsContent type="bom" />
      </div>
    </div>
  )
}
