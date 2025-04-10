
export type NewEceItem = {
  rowId: number
  typeApprovalNumber: string
  variant: string
  version: string
  sourceCountry: number
  sourceRegNo: string
  country: string
  created: Date
  brand: string
  sourceVIN: string
}

export type NewCatalogSearch = {
  searchId: string
  typeApprovalNumber: string
  extension: string
  variant: string
  version: string
  count: number
  newSearchId: string
  level: number
}

export type CatalogSearchPayload = {
  message?: string
  newCatalogSearchViews: NewCatalogSearch[]
}
