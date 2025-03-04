import { gql } from "graphql-request";

export const BRANDS_QUERY = gql`
query {
  brands(order: { name: ASC }) {
    id
    name
  }
}
`;

export const PRODUCTGROUPS_QUERY = gql`
query {
  productGroups(order: { name: ASC }) {
    id
    name
  }
}
`;

export const BRANDPRODUCTGROUP_QUERY = gql`
query($mapingType: Int!) {
    brands(
    order: { name: ASC }
    where: { productGroups: { some: { mapingType: { eq: $mapingType } } } }
  ) {
    id
    name
    productGroups(
      where: { mapingType: { eq: $mapingType } }
      order: { productGroup: { name: ASC } }
    ) {
      mapingType
      productGroup {
        id
        name
      }
    }
  }
  }
`;


export const OEITEMS_QUERY = gql`
query ($filter: OeItemFilterInput!, $countryCode: Int!) {
  oeItems(first: 100, where: $filter) {
    totalCount
    nodes {
      brandId
      countryCode
      oeItemId
      oeName
      productGroupId
      oeRefs(where: { countryCode: { eq: $countryCode} }) {
        itemId
        itemName
      }
    }
  }
}
`;
export const OEITEMBYID_QUERY = gql`
query ($id: String!) {
  oeItemById(id: $id) {
    created
    oeItemId
    modified
    oeName
    countryCode
    productGroup {
      name
      id
    }
    brand {
      name
      id
    }
    oeRefs {
      itemId
      itemName
      countryCode
    }
  }
}
`;

export const OEITEMLIST_QUERY = gql`
query ($filter: OeItemFilterInput!) {
  oeItems(first: 100, where: $filter) {
    totalCount
    nodes {
      brandId
      countryCode
      oeItemId
      oeName
      created
      modified
      productGroup {
       name
       id
      }
      brand {
        name
        id
      }
      oeRefs {
        itemId
        itemName
        countryCode
      }
    }
  }
}
`;
