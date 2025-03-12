import { Suspense } from 'react'
import VehicleContent from './_components/vehicle-content'


export default function VehiclePage() {
  return (
      <main className="flex w-full p-2">
        <Suspense>
          <VehicleContent />
        </Suspense>
      </main>
    )
}


