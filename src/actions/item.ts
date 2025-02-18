"use server"

import { auth } from "@/auth"
import { ADDITEMSTOBOM_MUTATION, REMOVEITEMSFROMBOM_MUTATION } from "@/graphql/oeitem-mutations"
import { OEITEMS_QUERY,OEITEMBYID_QUERY, OEITEMLIST_QUERY } from "@/graphql/oeitem-queries"
import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater"
import { FlattOeItem, OeItem } from "@/types"
import { revalidateTag } from "next/cache"

export const onGetItems = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const flatteOeItems: FlattOeItem[] = []

  const data =  await fetcher<OeItem[], any>(OEITEMS_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })

  data.oeItems.nodes?.forEach((item: any) => {
    if (item.oeRefs.length === 0) {
      flatteOeItems.push({oeItemId: item.oeItemId,oeName: item.oeName,itemId: ''})
    }
    else {
      item.oeRefs.forEach((ref: any) => {
        flatteOeItems.push({oeItemId: item.oeItemId,oeName: item.oeName,itemId: ref.itemId})
      })
    }
  })

  return { flatteOeItems, totalCount: data.oeItems.totalCount }
}

export const getOeItemById = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const itemData = await fetcher<OeItem, any>(OEITEMBYID_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })
  const item: OeItem = itemData?.oeItemById
  return item;
};

export const getOeItemList = async (variables: any) => {
   const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await await fetcher<OeItem, any>(OEITEMLIST_QUERY, variables, { Authorization: token, next: { revalidate: 300 } }) //sendGraphqlQueryAction(OEITEMLIST_QUERY, variables);
  const items: OeItem[] = response?.oeItems.nodes
  const totalCount = response?.oeItems.totalCount
  return { items, totalCount };
};

export const addItemsToBom = async (bomId: number, items: any[], option: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  let input: any[] = []
  items.forEach(item => {
    input.push({ bomId: bomId, oeItemId: item.oeItemId, option: option })
  });

  const response = await updater<any>(ADDITEMSTOBOM_MUTATION, { input: input },{ Authorization: token});
  revalidateTag('bom')
  return response
};

export const removeItemsFromBom = async (items: any[], option: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  let input: any[] = []
  items.forEach(item => {
    input.push({ bomId: item.bomId, oeItemId: item.oeItemId, option: option })
  });

  const response = await updater<any>(REMOVEITEMSFROMBOM_MUTATION, { input: input },{ Authorization: token});
  revalidateTag('bom')
  return response
};
