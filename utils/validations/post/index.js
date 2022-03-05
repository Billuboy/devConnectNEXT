import * as Yup from 'yup';

const schema = Yup.object().shape({
  text: Yup.string()
    .required('Post body is required')
    .typeError('Post body must be string'),
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
