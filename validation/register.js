import { isLength, isEmpty, equals, isEmail } from "validator";
import validText from "./valid-text";

export default function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  if (isEmpty(data.username)) {
    errors.username = "username is required";
  }

  if (!isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (isEmpty(data.email)) {
    errors.username = "Email is required";
  }

  if (!isEmail(data.email)) {
    errors.username = "Must be a valid email address";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be at least 4 characters";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Please re-enter your password";
  }

  if (!equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
