"use server"

import { auth } from "@/auth"
import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater"
import { SearchValue, SearchValueType } from '@/types';
import { SEARCHVALUES_QUERY, SEARCHVALUETYPES_QUERY, SEARCHVALUE_QUERY, SEARCHVALUEBYID_QUERY, CATALOG_QUERY } from "@/graphql/searchvalue-queries"
import { SearchValueActionResponse, SearchValueFormData } from "@/types/searchvalue";
import { createSearchValueSchema } from "@/schemas/zod-schemas";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CREATESEARCHVALUE_MUTATION, DELTESEARCHVALUE_MUTATION } from "@/graphql/searchvalue-mutations";
import { routes } from "@/config/routes";

export const onGetSearchValuesTypes = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValueType[], any>(SEARCHVALUETYPES_QUERY, {}, { Authorization: token, next: { revalidate: 300 } })
  return data
};

export const onGetSearchValues = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValueType[], any>(SEARCHVALUES_QUERY, variables, { Authorization: token, next: { revalidate: 300, tags: ['catalog'] } })
  const searchValues: SearchValue[] = data?.searchValues.nodes
  const totalCount = data?.searchValues.totalCount
  return { searchValues, totalCount };
};

export const getSearchValue = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValueType[], any>(SEARCHVALUE_QUERY, variables, { Authorization: token, next: { revalidate: 300 } })
  const searchValue: SearchValue = data?.searchValue[0] || null
  return searchValue;
};

export const getSearchValueById = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValue, any>(SEARCHVALUEBYID_QUERY, variables, { Authorization: token })
  return await data.searchValueById
};

export const getCatalog = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const data = await fetcher<SearchValue, any>(CATALOG_QUERY, variables, { Authorization: token})
  const catalog = data?.catalogAdmin
  return catalog;
};

export const createSearchValue = async (prevState: SearchValueActionResponse | null, formData: FormData) => {

  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const rawData: SearchValueFormData = {
    searchValue: formData.get('searchvalue') as string,
    valueType: Number(formData.get('valuetype')),
    countryCode: Number(formData.get('countryCode'))
  }

  const validatedData = createSearchValueSchema.safeParse(rawData)

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  const sv = {
    value: validatedData.data.searchValue,
    valueType: validatedData.data.valueType,
    countryCode: validatedData.data.countryCode
  }

  const response = await updater<any>(CREATESEARCHVALUE_MUTATION, { input: sv }, { Authorization: token });
  revalidateTag('catalog')
  redirect(routes.editCatalog(response.data.createSearchValue.searchValue.id));
};

export const deleteSearchValue = async (id: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await updater<any>(DELTESEARCHVALUE_MUTATION, { id: parseInt(id) }, { Authorization: token });
  revalidateTag('catalog')
  return response
};
