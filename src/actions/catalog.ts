"use server"

import { auth } from "@/auth"
import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater"
import { SearchValue, SearchValueType } from '@/types';
import { SEARCHVALUES_QUERY, SEARCHVALUETYPES_QUERY, SEARCHVALUE_QUERY, SEARCHVALUEBYID_QUERY, CATALOG_QUERY } from "@/graphql/searchvalue-queries"

export const onGetSearchValuesTypes = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValueType[], any>(SEARCHVALUETYPES_QUERY,{}, { Authorization: token, next: { revalidate: 300 } })
  return data
};

export const onGetSearchValues = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValueType[], any>(SEARCHVALUES_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })
  const searchValues: SearchValue[] = data?.searchValues.nodes
  const totalCount = data?.searchValues.totalCount
  return { searchValues, totalCount };
};
