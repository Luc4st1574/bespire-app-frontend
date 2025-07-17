import { gql } from "@apollo/client";

export const ASSIGN_USER_TO_REQUEST = gql`
  mutation AssignUserToRequest($requestId: ID!, $userId: ID!) {
    assignUserToRequest(requestId: $requestId, userId: $userId) {
      user 
      request
    }
  }
`;
