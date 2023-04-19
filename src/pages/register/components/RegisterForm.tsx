/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, FieldValues } from 'react-hook-form';
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  first_name: z
    .string({
      invalid_type_error: 'First name field is required.',
    })
    .min(1, { message: 'First name is required' })
    .max(18),
  last_name: z
    .string({ invalid_type_error: 'Last name field is required.' })
    .min(1, { message: 'Last name is required' })
    .max(18),
  username: z
    .string({ invalid_type_error: 'Username field is required.' })
    .min(5, { message: 'Username should be at least 5 characters long' }),
  email: z.string().email(),
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
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3" style={{ width: '30vw' }}>
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            {...register('first_name')}
            type="text"
            className="form-control"
            id="first_name"
          />
          {errors.first_name && (
            <p className="text-danger">{errors.first_name.message}</p>
          )}
        </div>
        <div className="mb-3" style={{ width: '30vw' }}>
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            {...register('last_name')}
            type="text"
            className="form-control"
            id="last_name"
          />
          {errors.last_name && (
            <p className="text-danger">{errors.last_name.message}</p>
          )}
        </div>
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
          <label htmlFor="email" className="form-label">
            Email Adress
          </label>
          <input
            {...register('email')}
            type="email"
            className="form-control"
            id="email"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
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
        <button disabled={!isValid} type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default BooksForm;
