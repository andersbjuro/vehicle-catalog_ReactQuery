import { gql } from "graphql-request";

export const CREATESEARCHVALUE_MUTATION  = gql`
mutation createSearchValue($input: CreateSearchValueInput!) {
  createSearchValue(input: $input)
  {
    searchValue {id}
  }
}
`;

export const DELTESEARCHVALUE_MUTATION  = gql`
mutation deleteSearchValue($id: Int!) {
  deleteSearchValue(id: $id)
}
`;
