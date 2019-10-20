import React from "react";
import { Formik, Field } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import loginSchema from "./loginSchema";
import * as userService from "../../services/userService";
import PropTypes from "prop-types";
import swal from "sweetalert";

class LogIn extends React.Component {
  state = {
    formData: {
      email: "",
      password: ""
    }
  };

  handleSubmit = values => {
    userService
      .logIn(values)
      .then(this.registerSuccess)
      .catch(this.registerError);
  };
  registerSuccess = () => {
    swal("Success!", "Log in Successful", "success");
  };
  registerError = () => {
    swal("Error", "Please check your username and password", "error");
  };
  toRegisterPage = () => {
    this.props.history.push("/register/new");
  };
  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={loginSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const { values, touched, errors, handleSubmit, isValid } = props;
            return (
              <div className="wrapper">
                <div className="block-center mt-4 wd-xl">
                  <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                      <img
                        className="block-center"
                        src="img/logo.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="card-body">
                      <p className="text-center py-2">LOG IN</p>
                      <Form className="mb-3" onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label className="text-muted">Email</Label>
                          <div className="input-group with-focus">
                            <Field
                              name="email"
                              type="email"
                              value={values.email}
                              placeholder=""
                              autoComplete="off"
                              label="email"
                              className={
                                errors.email && touched.email
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            <div className="input-group-append">
                              <span className="input-group-text text-muted bg-transparent border-left-0">
                                <em className="fa fa-envelope"></em>
                              </span>
                            </div>
                          </div>
                          {errors.email && touched.email && (
                            <span className="input-feedback">
                              {errors.email}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label className="text-muted">Password</Label>
                          <div className="input-group with-focus">
                            <Field
                              name="password"
                              type="password"
                              value={values.password}
                              placeholder=""
                              autoComplete="off"
                              label="password"
                              className={
                                errors.password && touched.password
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            <div className="input-group-append">
                              <span className="input-group-text text-muted bg-transparent border-left-0">
                                <em className="fa fa-lock"></em>
                              </span>
                            </div>
                          </div>
                          {errors.password && touched.password && (
                            <span className="input-feedback">
                              {errors.password}
                            </span>
                          )}
                        </FormGroup>
                        <Button
                          type="submit"
                          className="btn btn-block btn-info"
                          disabled={!isValid}
                        >
                          Log In
                        </Button>
                        <p className="pt-3 text-center">Not a member?</p>
                        <Button
                          className="btn btn-block btn-secondary"
                          onClick={this.toRegisterPage}
                        >
                          Register
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
LogIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
export default LogIn;
