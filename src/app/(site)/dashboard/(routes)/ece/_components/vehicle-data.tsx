"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import useVehicleStore from "@/store/use-vehicle-store";
import VehicleInfoDialog from "./vehicle-info-dialog";
import { useTranslations } from "next-intl";
import { translation } from "@/config/translation";

export const VehicleData = () => {
  const t = useTranslations(translation.ecePage);
  const { selectedNode, vehicle } = useVehicleStore();
  const header = () => {
    return vehicle?.rn01 !== undefined ? vehicle.rn01 + ' - ' + vehicle.fb01 + ' - ' + vehicle.fo02 + ' - ' + vehicle.fo14 + ' - ' + vehicle.fo04 : '';
  }

  return (
    <Card >
      <CardHeader>
        <CardDescription>
          {t('title')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {vehicle &&
          <div className="flex items-center justify-b mb-2 gap-2">
            <div className="flex flex-col text-sm w-full">
              <div>
                {header()}
              </div>
              <span>{selectedNode}</span>
            </div>
            <VehicleInfoDialog vehicle={vehicle} />
          </div>
        }
      </CardContent>
    </Card>
  )
}
