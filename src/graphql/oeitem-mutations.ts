import { gql } from "graphql-request";

export const ADDITEMSTOBOM_MUTATION  = gql`
mutation addBomLineItem($input: [AddRemoveBomLineInput!]!) {
  addBomLineItem(input: $input)
}
`;

export const REMOVEITEMSFROMBOM_MUTATION  = gql`
mutation removeBomLineItem($input: [AddRemoveBomLineInput!]!) {
  removeBomLineItem(input: $input)
}
`;

export const ADDITEMSTOCATALOG_MUTATION  = gql`
mutation addCatalogItem($input: [AddRemoveCatalogInput!]!) {
  addCatalogItem(input: $input)
}
`;

export const ADDBOMITEMSTOCATALOG_MUTATION  = gql`
mutation addBomCatalogItem($input: [AddRemoveBomCatalogInput!]!) {
  addBomCatalogItem(input: $input)
}
`;

export const REMOVEITEMSFROMCATALOG_MUTATION  = gql`
mutation removeCatalogItem($input: [AddRemoveCatalogInput!]!) {
  removeCatalogItem(input: $input)
}
`;
