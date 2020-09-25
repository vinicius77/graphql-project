import React, { useState } from 'react';
// this package parses the query into Javascript
import { useQuery } from '@apollo/client';

/** Importing Queries */
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS_QUERY);
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books</div>;
    } else if (data.books) {
      return data.books.map((book) => {
        return (
          <li
            style={{ cursor: 'pointer' }}
            key={book.id}
            onClick={(event) => {
              setSelected(book.title);
            }}
          >
            {book.title}
          </li>
        );
      });
    } else {
      return <li>ERROR</li>;
    }
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>{displayBooks()}</ul>
      <BookDetails bookTitle={selected} />
    </div>
  );
};

export default BookList;
