import { gql } from "graphql-request";

export const CREATEBOM_MUTATION  = gql`
mutation createBom($input: CreateBomInput!) {
  createBom(input: $input)
  {
    bom { id}
  }
}
`;

export const DELTEBOM_MUTATION  = gql`
mutation deleteBom($id: Int!) {
  deleteBom(id: $id)
}
`;
