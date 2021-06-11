const Joi = require("joi");

/**
 * postValidation
 *
 * validate request body for POST request
 */
const postValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    givenName: Joi.string().min(3).max(255).required(),
    familyName: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(data);
};

/**
 * patchValidation
 *
 * validate request body for PATCH request
 */
const patchValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255),
    givenName: Joi.string().min(3).max(255),
    familyName: Joi.string().min(3).max(255),
  });

  return schema.validate(data);
};

module.exports = {
  postValidation,
  patchValidation,
};
