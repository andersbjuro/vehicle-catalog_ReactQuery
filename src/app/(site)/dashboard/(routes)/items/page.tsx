import { Suspense } from "react";
import OeItemList from "./_components/oeitem-list";

export default async function OeItemsPage() {

  return (
    <Suspense>
      <OeItemList />
    </Suspense>
  )
}
