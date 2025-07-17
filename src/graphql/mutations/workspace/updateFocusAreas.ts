import { gql } from "@apollo/client";

export const UPDATE_FOCUS_AREAS = gql`
  mutation UpdateFocusAreas($workspaceId: String!, $focusAreas: [String!]!) {
    updateFocusAreas(workspaceId: $workspaceId, focusAreas: $focusAreas)
  }
`;
