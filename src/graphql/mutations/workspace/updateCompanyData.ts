import { gql } from '@apollo/client';

export const UPDATE_COMPANY_DATA = gql`
  mutation UpdateCompanyData($workspaceId: String!, $input: UpdateWorkspaceCompanyInput!) {
    updateCompanyData(workspaceId: $workspaceId, input: $input)
  }
`;