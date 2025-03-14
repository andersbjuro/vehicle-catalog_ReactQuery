import { gql } from "graphql-request";

export const CREATECACATALOGSEARCH_MUTATION  = gql`
mutation createCatalogSearch($input: CreateCatalogSearchInput!) {
  createCatalogSearch(input: $input) {
    message
    newCatalogSearchViews {
      count
      extension
      newSearchId
      searchId
      typeApprovalNumber
      variant
      version
      level
    }
  }
}
`;

export const COPYCACATALOGSEARCH_MUTATION  = gql`
mutation copyCatalogSearch($input: CopyCatalogSearchInput!) {
  copyCatalogSearch(input: $input)
}
`;
