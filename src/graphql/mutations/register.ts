import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      token
      user {
        email
        registrationStatus
      }
    }
  }
`;
