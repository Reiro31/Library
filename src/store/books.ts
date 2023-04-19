/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, Selector } from 'reselect';
// eslint-disable-next-line import/no-cycle
import { RootState } from './reducer';

type Book = {
  title: string;
  isbn: string;
  price: number;
  availableQuantity: number;
  unavailableQuantity: number;
  rentedDate?: Date;
  returnUntil?: Date;
  penaltyPerDay?: number;
};

type BooksState = Book[];

const initialState: BooksState = [
  {
    title: 'Book A',
    isbn: '17316312',
    price: 22,
    availableQuantity: 5,
    unavailableQuantity: 0,
  },
  {
    title: 'Book B',
    isbn: '17316323',
    price: 25,
    availableQuantity: 4,
    unavailableQuantity: 0,
  },
  {
    title: 'Book C',
    isbn: '17316338',
    price: 23,
    availableQuantity: 6,
    unavailableQuantity: 0,
  },
];

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookAdded: (books, action: PayloadAction<Book>) => {
      const existingBook = books.find(
        (book) => book.isbn === action.payload.isbn
      );

      if (existingBook) {
        existingBook.availableQuantity += action.payload.availableQuantity;
        existingBook.title = action.payload.title;
        existingBook.price = action.payload.price;
      } else {
        books.push({
          title: action.payload.title,
          isbn: action.payload.isbn,
          price: action.payload.price,
          availableQuantity: action.payload.availableQuantity,
          unavailableQuantity: 0,
        });
      }
    },
    bookRented: (books, action: PayloadAction<{ isbn: string }>) => {
      const index = books.findIndex(
        (book) => book.isbn === action.payload.isbn
      );
      books[index].unavailableQuantity++;
      books[index].availableQuantity--;
      books[index].rentedDate = new Date();
    },

    bookReturned: (books, action: PayloadAction<{ isbn: string }>) => {
      const index = books.findIndex(
        (book) => book.isbn === action.payload.isbn
      );
      books[index].unavailableQuantity--;
      books[index].availableQuantity++;
    },
  },
});

export const { bookAdded, bookRented, bookReturned } = slice.actions;
export default slice.reducer;

export const selectAllBooks: Selector<RootState, BooksState> = createSelector(
  (state: RootState) => state.library,
  (books: BooksState) => books.filter((book: Book) => book)
);

export const selectRentedBooks: Selector<RootState, BooksState> =
  createSelector(
    (state: RootState) => state.library,
    (books: BooksState) => {
      const rentedBooks: Book[] = [];
      const currentDate = new Date();
      books.forEach((book: Book) => {
        for (let i = 0; i < book.unavailableQuantity; i++) {
          const rentedBook: Book = { ...book };
          if (rentedBook.rentedDate) {
            const rentalDuration = Math.floor(
              (currentDate.getTime() - rentedBook.rentedDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            if (rentalDuration > 14) {
              const rentalFee = rentedBook.price * 0.01 * rentalDuration;
              rentedBook.price += rentalFee;
            }
            rentedBook.returnUntil = new Date(rentedBook.rentedDate);
            rentedBook.returnUntil.setDate(
              rentedBook.returnUntil.getDate() + 14
            );
            rentedBook.penaltyPerDay = rentedBook.price * 0.1;
          }
          rentedBooks.push(rentedBook);
        }
      });
      return rentedBooks;
    }
  );
