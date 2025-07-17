import { gql } from "@apollo/client";
export const REMOVE_MEMBER = gql`
  mutation RemoveMember($input: RemoveMemberInput!) {
    removeMember(input: $input)
  }
`;
