import { gql } from "@apollo/client";

export const REMOVE_BRAND = gql`
  mutation RemoveBrand($id: String!, $workspaceId: String!) {
    removeBrand(id: $id, workspaceId: $workspaceId)
  }
`;



