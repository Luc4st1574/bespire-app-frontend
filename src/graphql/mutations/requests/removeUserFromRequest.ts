import { gql } from "@apollo/client";

export const REMOVE_USER_FROM_REQUEST = gql`
  mutation RemoveUserFromRequest($requestId: ID!, $userId: ID!) {
    removeUserFromRequest(requestId: $requestId, userId: $userId)
  }
`;
