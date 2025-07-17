import { gql } from "@apollo/client";

export const FILES_BY_LINKED_TO_ID = gql`
  query filesByLinkedToId($linkedToId: String!) {
    filesByLinkedToId(linkedToId: $linkedToId) {
      id
      name
      url
      size
      ext
      uploadedAt
      uploadedBy
    }
  }
`;
