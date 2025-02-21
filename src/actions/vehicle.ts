"use server"

import { fetcher } from "@/lib/fetcher"
import { auth } from "@/auth"
import { VEHICLE_SE_ECETREE_QUERY, VEHICLE_NO_ECETREE_QUERY } from "@/graphql/vehicle-queries"

export const getVehicle = async (regNo: string) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_SE_ECETREE_QUERY, { id: regNo }, { Authorization: token, next: { revalidate: 300 } })
  console.log(res.vehicleById)
  return res.vehicleById || {}
};

export const getVehicleNo = async (variables: any) => {
  const session = await auth();
  const token = `Bearer ${session?.accessToken}`

  const res = await fetcher<any, any>(VEHICLE_NO_ECETREE_QUERY, { variables }, { Authorization: token, next: { revalidate: 300 } })
  return res.vehicleNoById || {};
};
