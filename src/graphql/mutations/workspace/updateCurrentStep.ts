import { gql } from "@apollo/client";

export const UPDATE_CURRENT_STEP = gql`
  mutation UpdateCurrentStep($workspaceId: String!, $currentStep: Float!) {
    updateCurrentStep(workspaceId: $workspaceId, currentStep: $currentStep)
  }
`;
