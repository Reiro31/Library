/* eslint-disable react/no-array-index-key */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookReturned, selectRentedBooks } from '../../../store/books';

function RentedBooks() {
  const books = useSelector(selectRentedBooks);
  const dispatch = useDispatch();
  const returnBook = useCallback(
    (isbn: string) => {
      dispatch(bookReturned({ isbn }));
    },
    [dispatch]
  );

  const currentDate = new Date();

  return (
    <>
      <h1 className="m-2">Currently rented</h1>
      {books.length === 0 && (
        <p className="m-2">
          There are currently no books in your personal library.
        </p>
      )}
      <div className="d-flex flex-row">
        {books.map((book, index) => {
          const returnUntilDate = new Date(book.returnUntil || '');
          const isOverdue = currentDate > returnUntilDate;
          const daysOverdue = isOverdue
            ? Math.ceil(
                (currentDate.getTime() - returnUntilDate.getTime()) /
                  (1000 * 3600 * 24)
              )
            : 0;
          const penalty = (book.penaltyPerDay ?? 0) * daysOverdue;

          return (
            <div
              key={book.isbn + index}
              className="card m-2 d-flex justify-content-start"
            >
              <div className="card-body" style={{ width: '12rem' }}>
                <h5 className="card-title mb-3">{book.title}</h5>
                <p className="card-text mb-1">
                  Price: ${book.price.toFixed(2)}
                  <span style={{ color: 'red', fontSize: '0.8rem' }}>
                    {' '}
                    +${penalty.toFixed(2)}
                  </span>
                </p>

                <p className="card-text mb-1">ISBN: {book.isbn}</p>
                <p className="card-text">
                  Please return until:{' '}
                  {new Date(book.returnUntil || '').toLocaleDateString()}
                </p>

                <button
                  type="submit"
                  onClick={() => returnBook(book.isbn)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '10rem' }}
                >
                  Return this book
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RentedBooks;
