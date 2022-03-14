import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import TextField from '@components/containers/textField';

export default function Login({ setAuthType }) {
  const router = useRouter();
  const onSubmit = async (data, { setErrors }) => {
    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (res.error) throw new Error(res.error);
      router.replace('/');
    } catch (err) {
      setErrors({ auth: err.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
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
    }),
    onSubmit,
  });

  const renderProviders = () => (
    <button onClick={() => signIn('google', { callbackUrl: '/' })}>
      Google
    </button>
  );

  const onChange = useCallback(
    (value, field) => formik.setFieldValue(field, value),
    []
  );

  const onBlur = useCallback(
    (field) => formik.setFieldTouched(`${field}`, true),
    []
  );

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <h4>Login</h4>
      <label htmlFor="username">Username</label>
      <TextField
        id="username"
        type="text"
        placeholder="Username"
        disabled={formik.isSubmitting}
        value={formik.values.username}
        onChange={onChange}
        onBlur={onBlur}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <TextField
        id="password"
        type="password"
        placeholder="Password"
        disabled={formik.isSubmitting}
        value={formik.values.password}
        onChange={onChange}
        onBlur={onBlur}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Loading...' : 'Sign-In with credentials'}
      </button>

      {formik.errors.auth}
    </form>
  );

  return (
    <div>
      <div>{renderProviders()}</div>
      <div>{renderForm()}</div>
      <div>
        New to DevChat?{' '}
        <span onClick={() => setAuthType('register')}>Sign-Up</span> on DevChat.
      </div>
    </div>
  );
}
