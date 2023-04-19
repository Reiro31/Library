/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, FieldValues } from 'react-hook-form';
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z
    .string({ invalid_type_error: 'Username field is required.' })
    .min(5, { message: 'Username should be at least 5 characters long' }),
  password: z
    .string({ invalid_type_error: 'Password is required' })
    .min(6, { message: 'The password should be at least 6 characters long' }),
});

type FormData = z.infer<typeof schema>;

function BooksForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="m-2">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3" style={{ width: '30vw' }}>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            {...register('username')}
            type="text"
            className="form-control"
            id="username"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-3" style={{ width: '30vw' }}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            className="form-control"
            id="password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="FieldsetCheck"
            disabled={!isValid}
          />
          <label className="form-check-label" htmlFor="FieldsetCheck">
            Remember me
          </label>
        </div>
        <button disabled={!isValid} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default BooksForm;
