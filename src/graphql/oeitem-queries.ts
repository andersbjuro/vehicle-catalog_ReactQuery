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
