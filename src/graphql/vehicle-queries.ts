import { gql } from "graphql-request";

export const VEHICLE_SE_ECETREE_QUERY = gql`
query vehicleById($id: String!) {
  vehicleById(id: $id) {
      rn01
      fb01
      fb05
      fb07
      fo01
      fo02
      fo04
      fo06
      fo10
      fo14
      td10
      td11
      td20
      td21
      td25
      td29
      td30
      td42
      td43
      td49
      be01dat
      be02dat
      eceTree {
        searchId
        valueType
        treeList {
          level
          nodeId
          nodeName
          parentId
        }
      }
    }
}
`;

export const VEHICLE_NO_ECETREE_QUERY = gql`
query vehicleNoById($id: String!) {
  vehicleNoById(id: $id) {
    rn01
    fb01
    fo14
    td10
    td11
    td20
    td21
    td25
    td29
    td30
    td42
    td43
    td49
    td05
    td01
    td02
    eceTree {
      searchId
      valueType
      treeList {
        level
        nodeId
        nodeName
        parentId
      }
    }
  }
}
`;

export const NEWVECE_ITEMS_QUERY = gql`
query {
  newVehicleItems(order: { created: ASC }) {
    brand
    country
    created
    rowId
    sourceCountry
    sourceRegNo
    sourceVIN
    typeApprovalNumber
    variant
    version
  }
}
`;
