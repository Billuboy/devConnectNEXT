const Joi = require('joi');

module.exports = function Validate(body, res) {
  const schema = Joi.object({
    school: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'School is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `School is required`;
            default:
              err.message = 'School must be string';
              break;
          }
        });
        return errors;
      }),
    degree: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Degree is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `Degree is required`;
            default:
              err.message = 'Degree must be string';
              break;
          }
        });
        return errors;
      }),
    fieldofstudy: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'FieldOfStudy is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `FieldOfStudy is required`;
            default:
              err.message = 'FieldOfStudy must be string';
              break;
          }
        });
        return errors;
      }),
    from: Joi.date()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'From is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `From is required`;
            default:
              err.message = 'From must be a date';
              break;
          }
        });
        return errors;
      }),
    to: Joi.date()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'To must be a date';
              break;
          }
        });
        return errors;
      }),
    current: Joi.boolean()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Current must be a boolean';
              break;
          }
        });
        return errors;
      }),
    description: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Description must be string';
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
