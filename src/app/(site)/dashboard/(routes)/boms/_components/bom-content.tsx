"use client"

import { onGetBom } from '@/actions/bom';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import BomForm from './bom-form';
import BomLineContent from './bom-line-content';
import ItemsContent from './items-content';
import useSettingStore from '@/hooks/use-setting-store';

export default function BomContent() {
  const params = useParams();
  const { id } = params;

  const {
    setting: { countryCode }
  } = useSettingStore()

  var filter = {
    id: Number(id),
    countryCode: countryCode
  }

  const { data } = useQuery({
    queryKey: ['bom', filter],
    queryFn: async () => { return onGetBom(filter) },
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
