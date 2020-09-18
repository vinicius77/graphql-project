import React from 'react';
// this package parses the query into Javascript
import { useQuery } from '@apollo/client';

/** Importing Queries */
import { GET_BOOKS_QUERY } from '../queries/queries';

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS_QUERY);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books</div>;
    } else if (data.books) {
      return data.books.map((book) => {
        return <li key={book.id}>{book.title}</li>;
      });
    } else {
      return <li>ERROR</li>;
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default BookList;
