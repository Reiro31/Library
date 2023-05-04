import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookRented, selectAllBooks } from '../../../store/books';

function AvailableBooks() {
  const books = useSelector(selectAllBooks);
  const dispatch = useDispatch();
  const rentBook = useCallback(
    (isbn: string) => {
      dispatch(bookRented({ isbn }));
    },
    [dispatch]
  );

  return (
    <>
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
