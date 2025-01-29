"use server"

import { auth } from "@/auth"
import { ADDITEMSTOBOM_MUTATION } from "@/graphql/oeitem-mutations"
import { OEITEMS_QUERY } from "@/graphql/oeitem-queries"
import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater"
import { OeItem } from "@/types"
import { revalidateTag } from "next/cache"

export const onGetItems = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  return await fetcher<OeItem[], any>(OEITEMS_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })
}

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

// export const removeItemsFromBom = async (bomId: number, items: any[], option: string) => {
//   let input: any[] = []
//   items.forEach(item => {
//     input.push({ bomId: bomId, oeItemId: item.oeItemId, option: option })
//   });

//   const response = await sendGraphqlMutateAction(REMOVEITEMSFROMBOM_MUTATION, { input: input });
//   revalidatePath("/dashboard/boms")
//   return response
// };
