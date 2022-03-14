import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { httpPost } from '@lib/http';

export default function PostCreate() {
  const controller = useRef(null);
  let timeout;

  useEffect(
    () => () => {
      controller.current?.abort();
      clearTimeout(timeout);
    },
    []
  );

  const onSubmit = async (data, { resetForm }) => {
    try {
      controller.current = new AbortController();
      await httpPost('/api/posts/', data, controller.current.signal);
      timeout = setTimeout(() => resetForm(), 500);
    } catch (err) {
      console.log('ERROR: http request has been cancelled by user');
    }
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object().shape({
      text: Yup.string()
        .required('Post body is required')
        .typeError('Post body must be string'),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <label htmlFor="postCreateArea">Create a post</label>
      <textarea
        name="postCreateArea"
        id="postCreateArea"
        cols="30"
        rows="10"
        disabled={formik.isSubmitting}
        {...formik.getFieldProps('text')}
      />
      {formik.touched.text && formik.errors.text ? (
        <div>{formik.errors.text}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Loading...' : 'Create'}
      </button>
    </form>
  );

  return renderForm();
}
