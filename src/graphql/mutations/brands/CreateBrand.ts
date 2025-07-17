import { gql } from "@apollo/client";

export const CREATE_BRAND = gql`
  mutation CreateBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      _id
      name
      slug
    }
  }
`;