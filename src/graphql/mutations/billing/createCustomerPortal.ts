import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_PORTAL_SESSION = gql`
  mutation CreateCustomerPortalSession($workspaceId: String!) {
    createCustomerPortalSession(workspaceId: $workspaceId)
  }
`;