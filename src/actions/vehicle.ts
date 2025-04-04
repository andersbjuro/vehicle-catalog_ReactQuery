"use server"

import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater";
import { auth } from "@/auth"
import { VEHICLE_SE_ECETREE_QUERY, VEHICLE_NO_ECETREE_QUERY, NEWVECE_ITEMS_QUERY, CATALOGSEARCHTOCOPY_QUERY, VEHICLE_SE_QUERY, VEHICLE_NO_QUERY } from "@/graphql/vehicle-queries"
import { CatalogSearchPayload, NewEceItem } from "@/types/ece";
import { CREATECATALOGSEARCH_MUTATION, COPYCATALOGSEARCH_MUTATION } from "@/graphql/ece-mutations";
import { revalidateTag } from "next/cache";

export const getVehicle = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_SE_ECETREE_QUERY, { id: regNo }, { Authorization: token })
  return res.vehicleById || {}
};

export const getVehicleSearchValue = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_SE_QUERY, { id: regNo }, { Authorization: token })
  return res.vehicleById || {}
};

export const getVehicleNo = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_NO_ECETREE_QUERY, { id: regNo }, { Authorization: token })
  return res.vehicleNoById || {};
};

export const getVehicleNoSearchValue = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_NO_QUERY, { id: regNo }, { Authorization: token })
  return res.vehicleById || {}
};

export const onGetNewEceItems = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<NewEceItem[], any>(NEWVECE_ITEMS_QUERY, {}, { Authorization: token })
  return res.newVehicleItems || []
};

export const onGetCatalogSearchToCopy = async (searchId: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<CatalogSearchPayload, any>(CATALOGSEARCHTOCOPY_QUERY, { searchId: searchId }, { Authorization: token })
  return res.catalogSearchToCopy || {}
};

export const createCatalogSearch = async (rowId: number) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await updater<any>(CREATECATALOGSEARCH_MUTATION, { input: { rowId: rowId } }, { Authorization: token });
  return response
};

export const copyCatalogSearch = async (searchId: string, newSearchId: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await updater<any>(COPYCATALOGSEARCH_MUTATION, { input: { searchId: searchId, newSearchId: newSearchId } }, { Authorization: token });
  console.log(response)
  revalidateTag('neweceitems')
  return response
};
