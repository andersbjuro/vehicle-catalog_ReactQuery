"use client"

import { OeItem } from "@/types"
import OeRefComponent from "./oeref-component"
import ItemForm from "./item-form"

interface ItemComponentProps {
  item: OeItem
}
export default function ItemComponent({item}: ItemComponentProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-1/2">
        <ItemForm item={item}/>
      </div>

      <div className="flex flex-row flex-1 mt-2">
        <div className="flex flex-col w-1/2">
          <OeRefComponent item={item}/>
        </div>

      </div>
    </div>
  )
}
