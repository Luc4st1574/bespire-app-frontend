import { gql } from "@apollo/client";



export const ADD_ASSIGNEE = gql`
  mutation addAssignee($input: CreateAssigneeInput!) {
    addAssignee(input: $input) {
      _id
    }
  }
`;

export const REMOVE_ASSIGNEE = gql`
  mutation removeAssignee($linkedToId: String!, $linkedToType: String!, $user: String!) {
    removeAssignee(linkedToId: $linkedToId, linkedToType: $linkedToType, user: $user)
  }
`;
