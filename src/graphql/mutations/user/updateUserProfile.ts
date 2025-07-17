import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) 
}

`;
