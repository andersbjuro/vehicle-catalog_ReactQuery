"use client"

import { useBrands } from "@/hooks/useBrands"
import { useProductGroups } from "@/hooks/useProductGroups"

export default function CreateBomPage() {
  const brands = useBrands()
  const productGroups = useProductGroups()

  return (
    <main className="flex w-full p-2">
      <div>Create</div>
    </main>
  )
}
