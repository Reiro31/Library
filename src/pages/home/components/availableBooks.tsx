/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  bookRented,
  selectAllBooks,
  selectBooksByName,
} from '../../../store/books';

function AvailableBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const books = useSelector(selectBooksByName(searchTerm));
  const dispatch = useDispatch();
  const rentBook = useCallback(
    (isbn: string) => {
      dispatch(bookRented({ isbn }));
    },
    [dispatch]
  );

  return (
    <>
      <form className="mb-3 m-2" onSubmit={(e) => e.preventDefault()}>
        <h1 className="mb-3">Are you looking for a specific book?</h1>
        <label htmlFor="searchBox" className="visually-hidden">
          Search books by name
        </label>
        <input
          style={{ maxWidth: '40vw' }}
          className="form-control"
          type="text"
          id="searchBox"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <h1 className="m-2">Currenly available</h1>
      <div className="d-flex flex-wrap justify-content-start m-3 available-books-container">
        {books.map((book) => (
          <div
            key={book.isbn}
            className="card m-2"
            style={{ maxWidth: '400px', minWidth: '200px' }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">{book.title}</h5>
              <p className="card-text mb-1">Price: ${book.price.toFixed(2)}</p>
              <p className="card-text mb-1">ISBN: {book.isbn}</p>
              <p className="card-text">
                Available copies: {book.availableQuantity}
              </p>
              <div className="d-flex justify-content-center">
                <button
                  disabled={book.availableQuantity === 0}
                  type="submit"
                  onClick={() => rentBook(book.isbn)}
                  className="btn btn-primary btn-sm"
                >
                  Rent this book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AvailableBooks;
