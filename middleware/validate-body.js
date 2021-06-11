const { postValidation, patchValidation } = require("../util/validation");

/**
 * validateRequest
 *
 * middleware function to validate the request body for POST & PATCH requests.
 */
const validateRequest = (req, res, next) => {
  switch (req.method) {
    case "POST": {
      // validate
      let { error } = postValidation(req.body);

      if (error) {
        // validation error

        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      //validation success
      return next();
    }

    case "PATCH": {
      // validate
      let { error } = patchValidation(req.body);

      if (error) {
        // validation error

        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      // validation success
      return next();
    }

    default:
      next();
  }
};

module.exports = validateRequest;
