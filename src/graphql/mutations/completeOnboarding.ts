import { gql } from "@apollo/client";

export const COMPLETE_ONBOARDING_MUTATION = gql`
  mutation CompleteOnboarding($input: OnboardingInput!) {
    completeOnboarding(input: $input)
  }
`;
