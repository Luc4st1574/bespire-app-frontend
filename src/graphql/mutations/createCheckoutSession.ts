import { gql } from "@apollo/client";

export const CREATE_CHECKOUT_SESSION = gql`
 mutation CreateCheckoutSession($plan: String!, $workspaceId: String!, $successUrl: String, $cancelUrl: String) {
  createCheckoutSession(plan: $plan, workspaceId: $workspaceId, successUrl: $successUrl, cancelUrl: $cancelUrl)
}
`;
