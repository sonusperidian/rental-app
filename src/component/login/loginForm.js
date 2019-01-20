import React from "react";
import { Field, reduxForm } from "redux-form";
import fieldValidation from "../register/fields";

const loginForm = props => {
  const { handleSubmit, pristine, submitting, loginUser, errors,serverError } = props;
  console.log('error from Login',serverError)

  return (
    <form
      onSubmit={handleSubmit(values => loginUser(values))}
      className="registration_form"
    >
      <div>
        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component={fieldValidation}
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <Field
              name="password"
              component={fieldValidation}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn-mt"
        >
          Submit
        </button>
        {errors.length > 0 && (
          <div>
            {" "}
            {errors.map((error, index) => (
              <p key={index}>{error.msg}</p>
            ))}{" "}
          </div>
        )}
         {serverError.length > 0 && (
          <div>
          <p>{serverError}</p>
          </div>
        )}
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  return errors;
};
export default reduxForm({
  form: "LoginForm",
  validate
})(loginForm);
