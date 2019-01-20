import React, { Component } from "react";
import RegisterForm from "./registerForm";
import * as actions from "../../actions/actions";

class Register extends Component {
  state = {
    errors: [],
    success: []
  };

  registerUserServerCall = userData => {
    actions.registerUser(userData).then(
      success => {
        this.setState({
          ...this.state,
          success: ["Registration is successful"],
          errors: []
        });
      },
      errors => {
        this.setState({ errors, success: [] });
        // console.log('Log from register',this.state.errors);
      }
    );
  };
  formValidation(formData) {}
  render() {
    return (
      <RegisterForm
        validation={this.formValidation}
        registerUser={userData => this.registerUserServerCall(userData)}
        success={this.state.success}
        errors={this.state.errors}
      />
    );
  }
}

export default Register;
