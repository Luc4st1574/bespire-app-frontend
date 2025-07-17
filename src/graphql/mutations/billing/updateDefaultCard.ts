import { gql } from "@apollo/client";

export const UPDATE_DEFAULT_CARD = gql`
  mutation UpdateDefaultCard($workspaceId: String!, $paymentMethodId: String!) {
    updateDefaultCard(workspaceId: $workspaceId, paymentMethodId: $paymentMethodId)
  }
`;
