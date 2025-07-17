import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    token
    user {
      email
      registrationStatus
    }
  }
}
`;

