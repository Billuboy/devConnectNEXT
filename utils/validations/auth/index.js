import * as Yup from 'yup';

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Must be 3-50 charaters long')
    .max(50, 'Must be 3-50 characters long')
    .required('Username is required')
    .typeError('Username must be string'),
  password: Yup.string()
    .min(8, 'Must be 8-30 characters long')
    .max(30, 'Must be between 8-30 characters long')
    .required('Password is required')
    .typeError('Username must be string'),
});

export default async (body) => {
  try {
    await schema.validate(body, { abortEarly: false });
    return { valid: true };
  } catch (error) {
    const validationErrors = error.inner.reduce(
      (acc, err) => ({ ...acc, [err.path]: err.errors[0] }),
      {}
    );
    return { valid: false, errors: validationErrors };
  }
};
