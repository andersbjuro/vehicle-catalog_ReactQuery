import { Suspense } from "react";
import SearchValueList from "./_components/searchvalue-list";

export default async function CatalogPage() {

  // const p = await searchParams
  // const filter = {
  //   filter: createSearchValueFilter({ searchValue: p?.query || '', valueType: p?.valueType })
  // }

  //const searchValueTypes = await getSearchValuesTypes();
  //const searchvalues = await getSearchValues(filter);

  return (
    <Suspense>
      <SearchValueList />
    </Suspense>
  )
}
