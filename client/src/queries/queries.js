import { gql } from '@apollo/client';

export const GET_BOOKS_QUERY = gql`
  {
    books {
      title
      id
      author
    }
  }
`;

export const GET_AUTHORS_QUERY = gql`
  {
    authors {
      id
      name
      born
    }
  }
`;
