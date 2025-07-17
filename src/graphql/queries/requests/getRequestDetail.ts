import { gql } from "@apollo/client";

export const GET_REQUEST_DETAIL = gql`
  query GetRequestDetail($id: String!) {
    requestDetail(id: $id) {
      id
      title
      details
      priority
      status
      parentRequest
      client {
        id
        name
        avatar
      }
      requester {
        id
        name
        avatarUrl
        teamRole
      }
      assignees {
        id
        name
        avatarUrl
        teamRole
      }
      createdAt
      dueDate
      timeSpent {
        hours
        minutes
      }
      category
      subType
      credits
      links {
        title
        favicon
        url
      }
      attachments {
        id
        name
        url
        ext
        size
        uploadedBy
        uploadedAt
      }
      subtasks {
        id
        title
        status
        dueDate
        assignees {
          id
          name
          avatarUrl
          teamRole
        }
      }
      comments {
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
  }
`;
