// graphql/queries/links.ts
import { gql } from "@apollo/client";


export const CREATE_LINK = gql`
  mutation createLink($input: CreateLinkInput!) {
    createLink(input: $input) {
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

export const DELETE_LINK = gql`
  mutation deleteLink($linkId: String!) {
    deleteLink(linkId: $linkId)
  }
`;
