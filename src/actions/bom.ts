"use server"

import { fetcher } from "@/lib/fetcher"
import { Bom } from "@/types"
import { BOM_QUERY, BOMBYID_QUERY } from "@/graphql/bom-queries"
import { auth } from "@/auth"
import { createBomSchema } from "@/schemas/zod-schemas"
import { CREATEBOM_MUTATION, DELTEBOM_MUTATION } from "@/graphql/bom-mutations"
import { revalidateTag } from "next/cache"
import { updater } from "@/lib/updater"
import { redirect } from "next/navigation"
import { BomActionResponse, BomFormData } from "@/types/bom"
import { routes } from "@/config/routes"

export const onGetBoms = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  const res = await fetcher<Bom[], any>(BOM_QUERY, variables, { Authorization: token, next: { revalidate: 60, tags: ['boms']} })
  return await res
}

export const onGetBom = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`
  //const res = await fetcher<Bom, any>(BOMBYID_QUERY, variables, { Authorization: token, next: { revalidate: 60, tags: ['bom'] } })
  const res = await fetcher<Bom, any>(BOMBYID_QUERY, variables, { Authorization: token })
  return await res.bomById
}

export const createBom = async (prevState: BomActionResponse | null, formData: FormData) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const rawData: BomFormData = {
    name: formData.get('name') as string,
    brandId: Number(formData.get('brandId')),
    productGroupId: Number(formData.get('productGroupId')),
    countryCode: Number(formData.get('countryCode'))
  }

   const validatedData = createBomSchema.safeParse(rawData)

   if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  const bom = {
    name: validatedData.data.name,
    brandId: validatedData.data.brandId,
    productGroupId: validatedData.data.productGroupId,
    countryCode: validatedData.data.countryCode
  }

  const response = await updater<any>(CREATEBOM_MUTATION, { input: bom }, { Authorization: token });
  revalidateTag('boms')
  redirect(routes.editBom(response.data.createBom.bom.id));
};

export const deleteBom = async (id: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await updater<any>(DELTEBOM_MUTATION, { id: parseInt(id) }, { Authorization: token });
  revalidateTag('boms')
  return response
};
