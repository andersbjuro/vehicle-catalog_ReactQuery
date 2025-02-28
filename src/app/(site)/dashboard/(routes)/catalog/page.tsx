import { Suspense } from "react";
import SearchValueList from "./_components/searchvalue-list";

export default async function CatalogPage() {
  return (
    <Suspense>
      <SearchValueList />
    </Suspense>
  )
}
