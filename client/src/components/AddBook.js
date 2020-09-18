import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

/** Importing Queries  */
import { GET_AUTHORS_QUERY } from '../queries/queries';

const AddBook = () => {
  const { loading, data } = useQuery(GET_AUTHORS_QUERY);
  const [book, setBook] = useState({ title: '', published: '', author: '' });

  const displayAuthors = () => {
    if (loading) {
      return (
        <option disabled key={'loading'}>
          Loading Authors ...
        </option>
      );
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.name}>
          {author.name}
        </option>
      ));
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(book);
  };

  return (
    <div>
      <h4>Add a new book</h4>
      <form onSubmit={(event) => onSubmitHandler(event)}>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={(event) => {
              setBook({ ...book, title: event.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="published">Published: </label>
          <input
            type="text"
            name="published"
            className="form-control"
            onChange={(event) => {
              setBook({ ...book, published: event.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="AuthorSelect">Author:</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(event) => {
              setBook({ ...book, author: event.target.value });
            }}
          >
            <option key={'select-author'}>Select Author</option>
            {displayAuthors()}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
