import { gql } from "@apollo/client";

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($updateBrandInput: UpdateBrandInput!) {
    updateBrand(updateBrandInput: $updateBrandInput) {
      _id
      name
      slug
    }
  }
`;