import { gql } from "@apollo/client";

export const GET_WORKSPACE_MEMBERS = gql`
  query GetWorkspaceMembers($workspaceId: String!) {
    getWorkspaceMembers(workspaceId: $workspaceId) {
      _id
      email
      role
      firstName
      lastName
      joinedAt
    }
  }
`;
