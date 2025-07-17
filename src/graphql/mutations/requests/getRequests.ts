import { gql } from '@apollo/client';

export const GET_REQUESTS = gql`
  query getRequestList {
    getRequestList {
        id
    title
    createdAt
    category
    dueDate
    parentRequest
    assignees{
      id
      name
      avatarUrl
      teamRole
    }
    commentsCount
    attachmentsCount
    subtasksCount
    credits
    priority
    status
    
    }
  }
`;
