import { gql } from "@apollo/client";

export const UPDATE_WORKSPACE_SETTINGS = gql`
  mutation UpdateWorkspaceSettings(
    $workspaceId: String!
    $input: UpdateWorkspaceSettingsInput!
  ) {
    updateWorkspaceSettings(workspaceId: $workspaceId, input: $input)
  }
`;
