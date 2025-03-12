"use server"

import { fetcher } from "@/lib/fetcher"
import { updater } from "@/lib/updater";
import { auth } from "@/auth"
import { VEHICLE_SE_ECETREE_QUERY, VEHICLE_NO_ECETREE_QUERY, NEWVEHICLE_ITEMS_QUERY } from "@/graphql/vehicle-queries"
import { NewVehicleItem } from "@/types/ece";
import { CREATECACATALOGSEARCH_MUTATION } from "@/graphql/ece-mutations";

export const getVehicle = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_SE_ECETREE_QUERY, { id: regNo }, { Authorization: token })
  return res.vehicleById || {}
};

export const getVehicleNo = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_NO_ECETREE_QUERY, { variables }, { Authorization: token })
  return res.vehicleNoById || {};
};

export const onGetNewVehicleItems = async () => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<NewVehicleItem[], any>(NEWVEHICLE_ITEMS_QUERY, { }, { Authorization: token })
  return res.newVehicleItems || []
};

export const createCatalogSearch = async (rowId: number) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const response = await updater<any>(CREATECACATALOGSEARCH_MUTATION, { input: {rowId: rowId} }, { Authorization: token });
  return response
};
