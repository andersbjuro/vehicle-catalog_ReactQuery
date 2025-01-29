"use server"

import { fetcher } from "@/lib/fetcher"
import { Bom, Brand } from "@/types"
import { BRANDPRODUCTGROUP_QUERY } from '@/graphql/brand-queries'
import { BOM_QUERY, BOMBYID_QUERY } from "@/graphql/bom-queries"
import { auth } from "@/auth"

export const onGetBrands = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Brand[], any>(BRANDPRODUCTGROUP_QUERY, { mapingType: 0 }, { Authorization: token, next: { revalidate: 300 } })
  return await res
}

export const onGetBoms = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Bom[], any>(BOM_QUERY, variables, { Authorization: token, next: { revalidate: 60 } })
  return await res
}

export const onGetBom = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Bom, any>(BOMBYID_QUERY, variables, { Authorization: token, next: { revalidate: 60, tags: ['bom'] } })
  return await res.bomById
}
