import { gql } from "@apollo/client";

export const ASSIGNEES_BY_ENTITY = gql`
  query assigneesByEntity($linkedToId: String!, $linkedToType: String!) {
    assigneesByEntity(linkedToId: $linkedToId, linkedToType: $linkedToType) {
      _id
      user {
        id
        name
        avatarUrl
        teamRole
      }
      assignedBy
      createdAt
    }
  }
`;
