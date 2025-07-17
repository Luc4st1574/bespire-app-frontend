// graphql/queries/billing.ts
import { gql } from "@apollo/client";

export const GET_WORKSPACE_INVOICES = gql`
  query GetWorkspaceInvoices($workspaceId: String!) {
    getWorkspaceInvoices(workspaceId: $workspaceId) {
      id
      date
      amount
      status
      pdfUrl
      plan
    }
  }
`;

export const GET_WORKSPACE_BILLING = gql`
  query GetWorkspaceBilling($workspaceId: String!) {
    getWorkspaceBilling(workspaceId: $workspaceId) {
      name
      currentPlan
      creditUsage
      hasPaid
      stripeCustomerId
      paymentMethod {
        brand
        last4
      }
    }
  }
`;