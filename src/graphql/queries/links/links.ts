import { gql } from "@apollo/client";

export const LINKS_BY_LINKED_TO_ID = gql`
  query linksByLinkedToId($linkedToId: String!) {
    linksByLinkedToId(linkedToId: $linkedToId) {
      id: _id
      url
      title
      favicon
      linkedToId
      linkedToType
      createdAt
    }
  }
`;
