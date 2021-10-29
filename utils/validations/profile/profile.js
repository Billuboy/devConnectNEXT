const Joi = require('joi');

module.exports = function Validate(body, res) {
  const schema = Joi.object({
    handle: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Handle is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `Handle is required`;
            default:
              err.message = 'Handle must be string';
              break;
          }
        });
        return errors;
      }),
    company: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Company must be string';
              break;
          }
        });
        return errors;
      }),
    website: Joi.string()
      .uri()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Website must be string';
              break;
          }
        });
        return errors;
      }),
    location: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Location must be string';
              break;
          }
        });
        return errors;
      }),
    status: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'TechStack is not allowed to be empty';
              break;
            case 'any.required':
              err.message = `TechStack is required`;
            default:
              err.message = 'TechStack must be string';
              break;
          }
        });
        return errors;
      }),
    skills: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Skills must be string';
              break;
          }
        });
        return errors;
      }),
    bio: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'Bio must be string';
              break;
          }
        });
        return errors;
      }),
    githubusername: Joi.string()
      .optional()
      .allow('')
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            default:
              err.message = 'GitHub UserName must be string';
              break;
          }
        });
        return errors;
      }),
    social: Joi.object({
      youtube: Joi.string()
        .optional()
        .allow('')
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              default:
                err.message = 'Youtube must be string';
                break;
            }
          });
          return errors;
        }),
      twitter: Joi.string()
        .optional()
        .allow('')
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              default:
                err.message = 'Twitter must be string';
                break;
            }
          });
          return errors;
        }),
      linkedin: Joi.string()
        .optional()
        .allow('')
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              default:
                err.message = 'Linkedin must be string';
                break;
            }
          });
          return errors;
        }),
      instagram: Joi.string()
        .optional()
        .allow('')
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              default:
                err.message = 'Instagram must be string';
                break;
            }
          });
          return errors;
        }),
      facebook: Joi.string()
        .optional()
        .allow('')
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              default:
                err.message = 'Facebook must be string';
                break;
            }
          });
          return errors;
        }),
    }),
  });

  const result = schema.validate(body, { abortEarly: false });

  let error = {};

  if (result.error) {
    result.error.details.forEach(err => {
      let path;
      if (err.path[0] === 'social') {
        path = err.path[1];
      } else {
        path = err.path[0];
      }
      error[path] = err.message;
    });
    res.status(400).json(error);
    return;
  }

  return 0;
};
