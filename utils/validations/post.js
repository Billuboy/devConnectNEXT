import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Must be atleast 3 charaters long')
    .required('Title is required')
    .typeError('Title must be string'),
  desc: Yup.string()
    .min(10, 'Must be atleast 10 characters long')
    .required('Description is required'),
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
