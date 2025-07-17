import { gql } from "@apollo/client";

export const CHECK_MEMBER_EXIST = gql`
  query CheckMemberExist($workspaceId: String!, $email: String!) {
    checkMemberExist(workspaceId: $workspaceId, email: $email)
  }
`;
