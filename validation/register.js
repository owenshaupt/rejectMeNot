const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be at least 4 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please re-enter your password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
