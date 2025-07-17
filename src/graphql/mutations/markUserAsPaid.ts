import { gql } from "@apollo/client";

export const MARK_USER_AS_PAID = gql`
  mutation MarkUserAsPaid {
    markUserAsPaid
  }
`;
