
import { getSearchValueById } from "@/app/actions/catalog-actions";
import SearchValueComponent from "../../_components/searchvalue-component";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SearchValuePage({ params }: PageProps) {
  const { id } = await params
  const searchValue = await getSearchValueById({ id: Number(id) })

  return (
    <Suspense>
      <SearchValueComponent searchValue={searchValue} />
    </Suspense>
  )
}
