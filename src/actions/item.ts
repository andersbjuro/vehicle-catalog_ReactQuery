"use server"

import { auth } from "@/auth"
import { OEITEMS_QUERY } from "@/graphql/oeitem-queries"
import { fetcher } from "@/lib/fetcher"
import { OeItem } from "@/types"

export const onGetItems = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<OeItem[], any>(OEITEMS_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })
  return await res
}
