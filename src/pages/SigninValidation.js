// import React from "react";

const SigninValidation = (signinData) => {
  let errors = {};

  if (!signinData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(signinData.email)) {
    errors.email = "Email is invalid";
  }

  if (!signinData.password) {
    errors.password = "Password is required";
  } else if (signinData.password.length < 5) {
    errors.password = "Password must be more than 5 character";
  }
  return errors;
};
export default SigninValidation;
