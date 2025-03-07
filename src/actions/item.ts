"use server"

import { auth } from "@/auth"
import { Brand, ProductGroup } from "@/types"
import { ADDBOMITEMSTOCATALOG_MUTATION, ADDITEMSTOBOM_MUTATION, ADDITEMSTOCATALOG_MUTATION, REMOVEITEMSFROMBOM_MUTATION, REMOVEITEMSFROMCATALOG_MUTATION } from "@/graphql/oeitem-mutations"
import { OEITEMS_QUERY, OEITEMBYID_QUERY, OEITEMLIST_QUERY } from "@/graphql/oeitem-queries"
import { BRANDS_QUERY, PRODUCTGROUPS_QUERY, BRANDPRODUCTGROUP_QUERY } from '@/graphql/oeitem-queries'
import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater"
import { FlattOeItem, OeItem } from "@/types"
import { revalidateTag } from "next/cache"

export const onGetBrands = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Brand[], any>(BRANDS_QUERY, {}, { Authorization: token, next: { revalidate: 300 } })
  return await res.brands
}

export const onGetProductGroups = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<ProductGroup[], any>(PRODUCTGROUPS_QUERY, {}, { Authorization: token, next: { revalidate: 300 } })
  return await res.productGroups
}

export const onGetBrandsProductGroup = async (mappingType: number) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Brand[], any>(BRANDPRODUCTGROUP_QUERY, {mapingType: mappingType }, { Authorization: token, next: { revalidate: 300 } })
  return await res
}

export const onGetItems = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const flatteOeItems: FlattOeItem[] = []

  const data = await fetcher<OeItem[], any>(OEITEMS_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })

  data.oeItems.nodes?.forEach((item: any) => {
    if (item.oeRefs.length === 0) {
      flatteOeItems.push({ oeItemId: item.oeItemId, oeName: item.oeName, itemId: '', itemName: '' })
    }
    else {
      item.oeRefs.forEach((ref: any) => {
        flatteOeItems.push({ oeItemId: item.oeItemId, oeName: item.oeName, itemId: ref.itemId, itemName: ref.itemName })
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

  const response = await updater<any>(ADDITEMSTOBOM_MUTATION, { input: input }, { Authorization: token });
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

  const response = await updater<any>(REMOVEITEMSFROMBOM_MUTATION, { input: input }, { Authorization: token });
  revalidateTag('bom')
  //return response
};

export const addItemsToCatalog = async (searchId: string, valueType: number, countryCode: number, items: any[]) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  let input: any[] = []
  items.forEach(item => {
    input.push({ searchId: searchId, valueType: valueType, bomId: 0, countryCode: countryCode, oeItemId: item.oeItemId })
  });

  const response = await updater<any>(ADDITEMSTOCATALOG_MUTATION, { input: input }, { Authorization: token });
  revalidateTag('catalog')
  return response
};

export const addBomItemsToCatalog = async (searchId: string, valueType: number, countryCode: number, boms: any[]) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  let input: any[] = []
  boms.forEach(item => {
    input.push({ searchId: searchId, valueType: valueType, bomId: item.id, countryCode: countryCode })
  });

  const response = await updater<any>(ADDBOMITEMSTOCATALOG_MUTATION, { input: input }, { Authorization: token });
  revalidateTag('catalog')
  return response
};


export const removeItemsFromCatalog = async (searchId: string, valueType: number, items: any[]) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  let input: any[] = []
  items.forEach(item => {
    input.push({ searchId: searchId, valueType: valueType, bomId: item.bomTableId, countryCode: 0, oeItemId: item.oeItemId })
  });

  const response = await updater<any>(REMOVEITEMSFROMCATALOG_MUTATION, { input: input }, { Authorization: token });
  revalidateTag('catalog')
  return response
}
