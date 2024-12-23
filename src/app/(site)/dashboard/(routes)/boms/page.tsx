import { Suspense } from "react";
import BomList from "./_components/bom-list";

export default function BomsPage() {
  return (
    <main className="flex w-full p-2">
      <Suspense>
        <BomList />
      </Suspense>
    </main>
  )
}
