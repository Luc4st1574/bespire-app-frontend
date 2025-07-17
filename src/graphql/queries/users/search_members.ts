
import { gql } from '@apollo/client';

export const SEARCH_MEMBERS_BESPIRE = gql`
  query searchMembersBespire($search: String!) {
    searchMembersBespire(search: $search) {
     id
    name
    avatarUrl
    teamRole
    }
  }
`;
