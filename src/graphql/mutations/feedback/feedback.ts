import { gql } from "@apollo/client";

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
      category
      title
    }
  }
`;
