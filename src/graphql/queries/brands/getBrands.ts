import { gql } from "@apollo/client";
export const GET_BRANDS =  gql`
  query GetAllBrands($workspace: String!) {
    getAllBrands(workspace: $workspace) {
      _id
      name
      slug
    }
  }
`;
