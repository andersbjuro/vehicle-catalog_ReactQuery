
import { getOeItemById } from "@/actions/item";
import ItemComponent from "../../_components/item-component";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;

};

export default async function BomPage({ params }: PageProps ) {
  const { id } = await params

  const item = await getOeItemById({id: id})

  return (
    <Suspense>
      <ItemComponent item={item} />
    </Suspense>
  )
}


