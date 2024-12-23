"use server"

import { fetcher } from "@/lib/fetcher"
import { Bom, Brand } from "@/types"
import { BRANDPRODUCTGROUP_QUERY } from '@/graphql/brand-queries'
import { BOM_QUERY, BOMBYID_QUERY } from "@/graphql/bom-queries"

export const onGetBrands = async () => {
  const res = await fetcher<Brand[], any>(BRANDPRODUCTGROUP_QUERY, { mapingType: 0 }, { Authorization: '', next: { revalidate: 300 } })
  return await res
}

export const onGetBoms = async (variables: any) => {
  const res = await fetcher<Bom[], any>(BOM_QUERY, variables, { Authorization: '', next: { revalidate: 30 } })
  return await res
}

export const onGetBom = async (variables: any) => {
  const res = await fetcher<Bom, any>(BOMBYID_QUERY, variables, { Authorization: '', next: { revalidate: 30 } })
  return await res
}
