import { gql } from "@apollo/client";

export const GET_SUBTASKS_BY_REQUEST = gql`
  query GetSubtasksByRequest($id: String!) {
    getSubtasksByRequest(id: $id) {
      id
      title
      status
      dueDate
      assignees {
        id
        name
        avatarUrl
        teamRole
      }
    }
  }
`;
