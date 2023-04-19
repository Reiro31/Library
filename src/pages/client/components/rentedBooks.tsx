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

  const totalPenalty = books.reduce((total, book) => {
    const returnUntilDate = new Date(book.returnUntil || '');
    if (currentDate > returnUntilDate) {
      const daysOverdue = Math.ceil(
        (currentDate.getTime() - returnUntilDate.getTime()) / (1000 * 3600 * 24)
      );
      return total + (book.penaltyPerDay ?? 0) * daysOverdue;
    }
    return total;
  }, 0);

  console.log({ books });

  return (
    <>
      <h1 className="m-2">Currently rented</h1>
      {books.length === 0 && (
        <p className="m-2">
          There are currently no books in your personal library.
        </p>
      )}
      <div className="d-flex flex-row">
        {books.map((book, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={book.isbn + index}
            className="card m-2 d-flex justify-content-start"
          >
            <div className="card-body" style={{ width: '12rem' }}>
              <h5 className="card-title mb-3">{book.title}</h5>
              <p className="card-text mb-1">Price: ${book.price.toFixed(2)}</p>
              <p className="card-text mb-1">ISBN: {book.isbn}</p>
              <p className="card-text mb-1">
                Copies owned: {book.unavailableQuantity}
              </p>
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
        ))}
      </div>
      <p className="m-2">
        Total penalty for overdue books: ${totalPenalty.toFixed(2)}
      </p>
    </>
  );
}

export default RentedBooks;
