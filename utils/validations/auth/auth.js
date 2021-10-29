const Joi = require('joi');
const _ = require('lodash');

module.exports = function Validate(body, res) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Name is not allowed to be empty';
              break;
            case 'string.min':
              err.message = `Name must be at least ${err.local.limit} characters long`;
              break;
            case 'string.max':
              err.message = `Name must be at most ${err.local.limit} characters long`;
              break;
            case 'any.required':
              err.message = 'Name is required';
            default:
              err.message = 'Name must be string';
              break;
          }
        });
        return errors;
      }),
    email: Joi.string()
      .email()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Email is not allowed to  be empty';
              break;
            case 'string.email':
              err.message = 'Incorrect email syntax';
              break;
            case 'any.required':
              err.message = 'Email is required';
              break;
            default:
              err.message = 'Email must be string';
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Password is not allowed to be empty';
              break;
            case 'string.min':
              err.message = `Password must be at least ${err.local.limit} characters long`;
              break;
            case 'string.max':
              err.message = `Password must be at most ${err.local.limit} characters long`;
              break;
            case 'any.required':
              err.message = `Password is required`;
            default:
              err.message = 'Password must be string';
              break;
          }
        });
        return errors;
      }),
  });

  const result = schema.validate(body, { abortEarly: false });

  let error = {};

  if (result.error) {
    result.error.details.forEach(err => {
      let path = err.path[0];
      error[path] = err.message;
    });
    res.status(400).json(error);
    return;
  }

  return 0;
};
