import { gql } from "graphql-request";

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
    }
  }
}
`;
