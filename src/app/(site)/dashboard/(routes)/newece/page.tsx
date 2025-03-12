import { Suspense } from "react"
import VehicleContent from "./_components/vehicle-content"

function VehicleNewPage() {
  return (
    <main className="flex w-full p-2">
      <Suspense>
        <VehicleContent />
      </Suspense>
    </main>
  )
}

export default VehicleNewPage
