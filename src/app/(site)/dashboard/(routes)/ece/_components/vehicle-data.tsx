"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import useVehicleStore from "@/store/use-vehicle-store";

export const VehicleData = () => {

  const { selectedNode, vehicle } = useVehicleStore();
  const header = () => {
    return vehicle?.rn01 !== undefined ? vehicle.rn01 + ' - ' + vehicle.fb01 + ' - ' + vehicle.fo02 + ' - ' + vehicle.fo14 + ' - ' + vehicle.fo04 : '';
  }

  return (
    <Card >
      <CardHeader>
        <CardDescription>
          Detaljer för fordon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col text-sm">
          <div>
            {header()}
          </div>
          <span>{selectedNode}</span>
        </div>
      </CardContent>
    </Card>
  )
}
