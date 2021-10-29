const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = function (body, res) {
  const result = Joi.objectId().validate(body);

  if (result.error) {
    res.status(400).json({ objectId: 'Invalid objectId' });
    return;
  }

  return 0;
};
