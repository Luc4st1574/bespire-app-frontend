// src/graphql/mutations/auth/refreshToken.ts
import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      user {
        email
        registrationStatus
      }
    }
  }
`;
