import { gql } from "@apollo/client";

export const GET_SERVICES_AND_BRANDS = gql`
  query GetServicesAndBrands($workspaceId: String!) {
    servicesActive {
      _id
      title
      type
      description
      credits
    }
    brandsForWorkspace(workspaceId: $workspaceId) {
      _id
      name
      slug
    }
  }
`;
