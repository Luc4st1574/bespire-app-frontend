
import { gql } from '@apollo/client';
export const GET_WORKSPACE_BASIS_BY_ID = gql`
  query getWorkspaceBasisById($workspaceId: String!) {
    getWorkspaceBasisById(workspaceId: $workspaceId) {
    _id
    name
    onboardingCompleted
    currentStep
    hasPaid
    companyImg
    companyName
    defaultRequestsView
    getStarted
    quickLinks
    plan
    planCancelPending
    planEndsAt
    owner{
        _id
        email
        firstName
        lastName
        avatarUrl
    }
    }
  }
`;

export const GET_FOCUSES_AREAS_WORKSPACE = gql`
  query getWorkspaceBasisById($workspaceId: String!) {
    getWorkspaceBasisById(workspaceId: $workspaceId) {
   focusAreas
    }
  }
`;

