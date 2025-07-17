import { gql } from "@apollo/client";

export const UPDATE_ONBOARDING_PROGRESS_MUTATION = gql`
  mutation UpdateOnboardingProgress($input: JSON!) {
    updateOnboardingProgress(input: $input)
  }
`;
