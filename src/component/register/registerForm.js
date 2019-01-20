import React from "react";
import { Field, reduxForm } from "redux-form";
import fieldValidation from "./fields";

const registerForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    registerUser,
    errors,
    success
  } = props;

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(values => registerUser(values))}
      className="registration_form"
    >
      <div className="form-group">
        <label>User Name</label>
        <div>
          <Field
            name="username"
            component={fieldValidation}
            type="text"
            placeholder="Username"
          />
        </div>
      </div>

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
      <div>
        <label>ConfirmPassword</label>
        <div>
          <Field
            name="confirmPassword"
            component={fieldValidation}
            type="password"
            placeholder="ConfirmPassword"
          />
        </div>
      </div>
      <div>
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
        {success.length > 0 && (
          <div>
            {" "}
            {success.map((succes, index) => (
              <p key={index}>{succes}</p>
            ))}{" "}
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
  if (!values.username) {
    errors.username = "Please enter a valid user name";
  }
  return errors;
};
export default reduxForm({
  form: "RegisterForm",
  validate
})(registerForm);
