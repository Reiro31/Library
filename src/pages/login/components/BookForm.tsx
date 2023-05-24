/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { bookAdded } from '../../../store/books';

const schema = z.object({
  title: z
    .string({ invalid_type_error: 'Title field is required.' })
    .min(3, { message: 'Title must be at least 3 characters long.' }),
  isbn: z
    .string({ invalid_type_error: 'ISBN field is required.' })
    .min(8, { message: 'The ISBN should be 8 characters long.' })
    .max(8, { message: 'The ISBN should be 8 characters long.' }),
  price: z.number({ invalid_type_error: 'Price field is required.' }).min(1),
  amount: z.number({ invalid_type_error: 'Price field is required.' }).min(1),
});

type FormData = z.infer<typeof schema>;

function BooksForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      price: 0,
      amount: 1,
    });
  }, [reset]);

  const onSubmit = (data: FieldValues) => {
    dispatch(
      bookAdded({
        title: data.title,
        isbn: data.isbn,
        price: data.price,
        availableQuantity: data.amount,
        unavailableQuantity: 0,
      })
    );
  };

  return (
    <>
      <h1>Add a new book</h1>
      <div className="m-2" style={{ width: '50vw' }}>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Book Title
            </label>
            <input
              {...register('title')}
              type="text"
              className="form-control"
              id="title"
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              {...register('isbn')}
              type="string"
              className="form-control"
              id="isbn"
            />
            {errors.isbn && (
              <p className="text-danger">{errors.isbn.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              className="form-control"
              id="price"
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              {...register('amount', { valueAsNumber: true })}
              type="number"
              className="form-control"
              id="amount"
            />
            {errors.amount && (
              <p className="text-danger">{errors.amount.message}</p>
            )}
          </div>
          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default BooksForm;
