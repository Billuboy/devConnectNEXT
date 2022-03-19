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
      title: '',
      desc: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, 'Must be atleast 3 charaters long')
        .required('Title is required')
        .typeError('Title must be string'),
      desc: Yup.string()
        .min(10, 'Must be atleast 10 characters long')
        .required('Description is required'),
    }),
    onSubmit,
  });

  const renderForm = () => (
    <form
      onSubmit={formik.handleSubmit}
      className="form border-2 border-gray-100 border-solid p-8 rounded-2xl shadow-xl"
    >
      <label htmlFor="title">
        <p>Title</p>
        <input
          name="title"
          id="title"
          cols="30"
          rows="10"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('title')}
        />
      </label>
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="desc">
        <p>Description</p>
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('desc')}
        />
      </label>
      {formik.touched.desc && formik.errors.desc ? (
        <div>{formik.errors.desc}</div>
      ) : null}

      <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Loading...' : 'Create'}
      </button>
    </form>
  );

  return renderForm();
}
