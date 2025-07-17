import { gql } from "@apollo/client";

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($input: UpdatePreferencesInput!) {
    updateUserPreferences(input: $input)
  }
`;
