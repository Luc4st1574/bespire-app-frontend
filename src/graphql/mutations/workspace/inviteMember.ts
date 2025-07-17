import { gql } from "@apollo/client";

export const INVITE_MEMBER = gql`
  mutation InviteMember($workspaceId: String!, $member: InviteMemberInput!) {
    inviteMember(workspaceId: $workspaceId, member: $member)
  }
`;
