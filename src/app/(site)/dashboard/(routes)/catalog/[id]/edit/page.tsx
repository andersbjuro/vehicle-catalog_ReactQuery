
//import { getSearchValueById } from "@/app/actions/catalog-actions";
import SearchValueComponent from "../../_components/searchvalue-content";
import { Suspense } from "react";

// type PageProps = {
//   params: Promise<{
//     id: string;
//   }>;
// };

export default function SearchValuePage() {
  //const { id } = await params
  //const searchValue = await getSearchValueById({ id: Number(id) })

  return (
    <Suspense>
      <SearchValueComponent  />
    </Suspense>
  )
}
