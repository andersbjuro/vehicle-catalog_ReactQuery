import { gql } from "graphql-request";

export const BOM_QUERY = gql`
query GetBoms($filter: BomFilterInput!) {
  boms(first: 100, order: { modified: DESC, name: ASC }, where: $filter) {
    totalCount
    nodes {
      id
      name
      noOfItems
      countryCode
      created
      modified
      brandId
      productGroupId
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

export const BOMBYID_QUERY = gql`
query ($id: Int!, $countryCode: Int!) {
  bomById(id: $id) {
    created
    id
    modified
    name
    noOfItems
    countryCode
    productGroupId
    productGroup {
       name
        id
    }
    brand {
        name
        id
    }
    lines {
      bomId
      oeItemId
      oeItem {
        oeName
        oeRefs( where:  { or: [{countryCode: {eq: $countryCode}}, {itemId: { eq: ""}}]}) {
          itemId
          countryCode
        }
      }
    }
  }
}
`;
