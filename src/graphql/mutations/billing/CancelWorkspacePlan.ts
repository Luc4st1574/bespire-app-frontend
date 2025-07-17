import { gql } from "@apollo/client";

export const CANCEL_WORKSPACE_PLAN = gql`
  mutation CancelWorkspacePlan($input: CancelPlanInput!) {
    cancelWorkspacePlan(input: $input)
  }
`;
