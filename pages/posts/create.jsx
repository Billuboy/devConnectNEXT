import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { jsonStringify } from '@lib/parseJSON';

export default function PostCreate() {
  const [resetFunction, setResetFunction] = useState(null);
  const controller = useRef(null);

  useEffect(() => {
    let timeout;
    if (resetFunction) timeout = setTimeout(() => resetFunction(), 500);

    return () => {
      controller.current?.abort();
      clearTimeout(timeout);
    };
  }, [resetFunction]);

  const onSubmit = async (data, { resetForm }) => {
    try {
      controller.current = new AbortController();
      await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonStringify(data),
        signal: controller.current.signal,
      });
    } catch (err) {
      console.log('ERROR: http request has been cancelled by user');
    }

    setResetFunction(resetForm);
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
