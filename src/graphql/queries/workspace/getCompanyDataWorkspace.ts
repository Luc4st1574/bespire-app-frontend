import { gql } from '@apollo/client';

export const GET_COMPANY_DATA_BY_WORKSPACE_ID = gql`
  query GetCompanyDataByWorkspaceId($workspaceId: String!) {
    getCompanyDataByWorkspaceId(workspaceId: $workspaceId) {
      companyName
      companyImg
      companyWebsite
      companyIndustry
      companySize
      location
      brandArchetype
      communicationStyle
      elevatorPitch
      mission
      vision
      valuePropositions
    }
  }
`;