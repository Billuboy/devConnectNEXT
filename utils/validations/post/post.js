const Joi = require('joi');

module.exports = function (body, res) {
  const schema = Joi.object({
    text: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Post is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `Post is required`;
            default:
              err.message = 'Post must be string';
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
