import { Icons } from "@/components/icons";

export type TenantLinkType = {
  id: string;
  name: string;
  issuer: string;
  icon: keyof typeof Icons;
}

export type TenantType = TenantLinkType[];

export type Brand = {
  id: number,
  name: string,
  productGroups: ProductGroup[]
};

export type ProductGroup = {
  id: string,
  name: string,
};

export type OeRef = {
  itemId: string
  itemName: string
  countryCode: Number
}

export type OeItem = {
  oeItemId: string
  oeName: string
  brand: Brand,
  countryCode: number
  productGroup: ProductGroup
  modified: Date
  created: Date
  oeRefs: OeRef[]
}

export type FlattBomLine = {
  oeItemId: string
  oeName: string
  itemId: string
}
export type BomLine = {
  bomId: number
  oeItemId: string
  oeItem: OeItem
}

export type Bom = {
  id: number,
  name: string,
  brandId: number,
  productGroupId: number
  noOfItems: number,
  countryCode: number
  brand: Brand,
  productGroup: ProductGroup
  modified: Date
  created: Date
  lines: BomLine[]
};
