import { Icons } from "@/components/icons";

export type Country = {
  code: number,
  text: string,
}

export type ClientSetting = {
  countryCode: number,
  pageSize: number,
  availableCountries: Country[]
}

export type Data = {
  setting: ClientSetting
}

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

export type FlattOeItem = {
  oeItemId: string
  oeName: string
  itemId: string
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

export type BomDetailFilter = {
  id: number
  countryCode: number
}

export type FlattBomLine = {
  bomId: number
  bomCountryCode: number
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

export type BomFilterTypes = {
  query: string
  brand: number;
  productGroup: number;
};

export type SearchValueType = {
  id: number
  name: string
}

export type SearchValue = {
  id: number
  value: string
  valueType: number
  noOfItems: number
  countryCode: number
  modified: Date
  created: Date
  searchValueType: SearchValueType
}

export type Catalog = {
  oeItemId: string
  oeName: string
  itemId: string
  bomTableId: number
}
