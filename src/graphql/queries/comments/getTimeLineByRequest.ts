import { gql } from "@apollo/client";

export const GET_TIMELINE_BY_REQUEST = gql`
  query GetTimeLineByRequest($id: String!) {
    getTimeLineByRequest(id: $id) {
      id
      user {
        id
        name
        avatarUrl
        teamRole
      }
      createdAt
      text
      type
      activityText
    }
  }
`;
