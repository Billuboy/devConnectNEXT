// const Joi = require('joi');

// module.exports = function Validate(body, res) {
//   const schema = Joi.object({
//     title: Joi.string()
//       .required()
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             case 'string.empty':
//               err.message = 'Title is not allowed to be empty';
//               break;
//             case 'any.required':
//               err.message = `Title is required`;
//             default:
//               err.message = 'Title must be string';
//               break;
//           }
//         });
//         return errors;
//       }),
//     company: Joi.string()
//       .required()
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             case 'string.empty':
//               err.message = 'Company is not allowed to be empty';
//               break;
//             case 'any.required':
//               err.message = `Company is required`;
//             default:
//               err.message = 'Company must be string';
//               break;
//           }
//         });
//         return errors;
//       }),
//     location: Joi.string()
//       .required()
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             case 'string.empty':
//               err.message = 'Location is not allowed to be empty';
//               break;
//             case 'any.required':
//               err.message = `Location is required`;
//             default:
//               err.message = 'Location must be string';
//               break;
//           }
//         });
//         return errors;
//       }),
//     from: Joi.date()
//       .required()
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             case 'string.empty':
//               err.message = 'From is not allowed to be empty';
//               break;
//             case 'any.required':
//               err.message = `From is required`;
//             default:
//               err.message = 'From must be a date';
//               break;
//           }
//         });
//         return errors;
//       }),
//     to: Joi.date()
//       .optional()
//       .allow('')
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             default:
//               err.message = 'To must be a date';
//               break;
//           }
//         });
//         return errors;
//       }),
//     current: Joi.boolean()
//       .optional()
//       .allow('')
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             default:
//               err.message = 'Current must be a boolean';
//               break;
//           }
//         });
//         return errors;
//       }),
//     description: Joi.string()
//       .optional()
//       .allow('')
//       .error((errors) => {
//         errors.forEach((err) => {
//           switch (err.code) {
//             default:
//               err.message = 'Description must be string';
//               break;
//           }
//         });
//         return errors;
//       }),
//   });

//   const result = schema.validate(body, { abortEarly: false });

//   let error = {};

//   if (result.error) {
//     result.error.details.forEach((err) => {
//       let path = err.path[0];
//       error[path] = err.message;
//     });
//     res.status(400).json(error);
//     return;
//   }

//   return 0;
// };
