import { gql } from "@apollo/client";
export const CREATE_SETUP_INTENT = gql`
  mutation CreateSetupIntent($workspaceId: String!) {
    createSetupIntent(workspaceId: $workspaceId)
  }
`;
