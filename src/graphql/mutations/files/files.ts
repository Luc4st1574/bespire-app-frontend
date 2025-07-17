import { gql } from "@apollo/client";



export const CREATE_FILE = gql`
  mutation createFile($input: CreateFileInput!) {
    createFile(input: $input) {
      _id
      name
      url
      size
      ext
      type
      uploadedAt
      uploadedBy
      linkedToId
      linkedToType
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($fileId: String!) {
    deleteFile(fileId: $fileId)
  }
`;
