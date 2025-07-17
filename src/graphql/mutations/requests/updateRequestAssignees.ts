import { gql } from "@apollo/client";

export const UPDATE_REQUEST_ASSIGNEES = gql`
  mutation UpdateRequestAssignees($input: UpdateAssigneesInput!) {
    updateRequestAssignees(input: $input)
  }
`;
