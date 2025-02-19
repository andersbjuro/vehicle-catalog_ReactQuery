"use client"

import { Bom, FlattBomLine } from "@/types";
import { BomLineTable } from "@/components/bom-line-table/bom-line-table";

interface Props {
  bom: Bom;
}

function BomLineContent({ bom }: Props) {
  const flattenBomLines: FlattBomLine[] = []

  bom?.lines.forEach((line => {
    if (line.oeItem.oeRefs.length === 0) {
      flattenBomLines.push({ bomId: line.bomId, bomCountryCode: bom.countryCode, oeItemId: line.oeItemId, oeName: line.oeItem.oeName, itemId: '', itemName: '' })
    }
    else {
      line.oeItem.oeRefs.forEach((ref) => {
        flattenBomLines.push({ bomId: line.bomId, bomCountryCode: bom.countryCode, oeItemId: line.oeItemId, oeName: line.oeItem.oeName, itemId: ref.itemId, itemName: ref.itemName})
      })
    }
  }))

  return (
    <BomLineTable bomLines={flattenBomLines} />
  )
}

export default BomLineContent
