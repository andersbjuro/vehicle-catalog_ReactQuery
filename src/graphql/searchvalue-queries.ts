import { gql } from "graphql-request";

export const SEARCHVALUETYPES_QUERY = gql`
  query {
      searchValueTypes(where: { id: {neq: 0} }) {
      id
      name
      reserved
    }
  }
`;

export const SEARCHVALUES_QUERY = gql`
query ($filter: SearchValueFilterInput!) {
  searchValues(first: 100, order: { modified: DESC, value: ASC }, where: $filter) {
      totalCount
      nodes {
        id
        value
        valueType
        noOfItems
        countryCode
        searchValueType {
          id
          name
        }
        modified
        created
      }
    }
}
`;


export const SEARCHVALUEBYID_QUERY = gql`
query ($id: Long!) {
  searchValueById(id: $id) {
    created
    id
    modified
    value
    valueType
    noOfItems
    countryCode
    searchValueType {
      id
      name
      reserved
    }
  }
}
`;

export const SEARCHVALUE_QUERY = gql`
query ($value: String!, $valueType: Int!) {
  searchValue(value: $value, valueType: $valueType) {
    created
    id
    modified
    value
    valueType
    noOfItems
    countryCode
  }
}
`;

export const CATALOG_QUERY = gql`
  query ($searchValue: String!, $valueType: Int!, $countryCode: Int!) {
    catalogAdmin(searchValue: $searchValue, valueType: $valueType, countryCode: $countryCode) {
      oeItemId
      oeName
      itemId
      itemName
      value
      valueType
      bomTableId
    }
  }
`;
