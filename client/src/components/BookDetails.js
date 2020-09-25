import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK_BY_TITLE_QUERY } from '../queries/queries';

const BookDetails = ({ bookTitle }) => {
  const [book, setBook] = useState(null);

  const result = useQuery(GET_BOOK_BY_TITLE_QUERY, {
    variables: { title: bookTitle },
  });

  useEffect(() => {
    if (result.data) {
      setBook(result.data.book);
    }
  }, [result.data]);

  console.log(' R E S U L T ', result.data);

  if (result.loading) {
    return <div>Loading ...</div>;
  }

  if (!book) {
    return (
      <div class="alert alert-info" role="alert">
        Click in the book for check it out!
      </div>
    );
  }

  return (
    <div>
      <hr />
      <h3>
        <strong>Title: </strong>
        {book.title}
      </h3>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <strong>Published:</strong> {book.published}
        </li>
        <li>
          <strong>Author:</strong>{' '}
          {book.authorBook.name ? book.authorBook.name : ''}
        </li>
        <li>
          <strong>Born:</strong>{' '}
          {book.authorBook.born ? book.authorBook.born : 'unknown'}
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default BookDetails;
