import { gql } from "@apollo/client";

export const CREATE_REQUEST = gql`
  mutation CreateRequest($input: CreateRequestInput!) {
  createRequest(input: $input) {
    _id
    title
    createdAt
  }
}
`;
