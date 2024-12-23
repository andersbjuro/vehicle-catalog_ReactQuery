import { gql } from "graphql-request";

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
