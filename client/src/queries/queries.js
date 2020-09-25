import { gql } from '@apollo/client';

/** =====================================
 *
 *              Q U E R I E S
 *
 *  ===================================== */

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

/** =================================
 *
 *         M U T A T I O N S
 *
 *  ================================= */

/** To be able to use variables, we must also name our queries / mutations.*/
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!) {
    addBook(title: $title, author: $author, published: $published) {
      id
      title
      published
      author
    }
  }
`;

/** ============================================
 *
 *              Book By Title Query
 *
 *  ============================================ */

export const GET_BOOK_BY_TITLE_QUERY = gql`
  query getBookById($title: String!) {
    book(title: $title) {
      title
      published
      id
      authorBook {
        name
        born
        id
      }
    }
  }
`;
