import React from "react";
import { Formik, Field } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import registerSchema from "./registerSchema";
import PropTypes from "prop-types";
import * as userService from "../../services/userService";
import PasswordStrengthBar from "react-password-strength-bar";
import swal from "sweetalert";
import Swal from "sweetalert2";

class Register extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      confirmPassword: "",
      userStatusId: 0,
      isConfirmed: 0,
      roleId: ""
    },
    hidden: true
  };
  componentDidMount() {
    this.fillDropDown();
  }
  fillDropDown = () => {
    userService
      .fillDrop()
      .then(this.fillDropSuccess)
      .catch(this.fillDropError);
  };
  fillDropSuccess = response => {
    this.setState({
      roleId: response.item
    });
  };
  toggleView = () => {
    this.setState(prevState => {
      return { hidden: !prevState.hidden };
    });
  };
  handleSubmit = values => {
    userService
      .addUser(values)
      .then(this.registerSuccess)
      .catch(this.registerError);
  };
  registerSuccess = () => {
    swal("Success!", "New Account was created", "success");
  };
  registerError = res => {
    Swal.fire({
      type: "error",
      title: "Error",
      text: res.response.data.errors[0].includes("email")
        ? "This Email has already been taken. Please try another Email." ||
          res.response.data.errors[0].includes("regular expression")
        : "Please check the password format"
    });
  };
  mapRoleId = role => {
    return (
      <option key={role.id} value={role.id}>
        {role.name}
      </option>
    );
  };
  toLogInPage = () => {
    this.props.history.push("/users/login");
  };
  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={registerSchema}
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
                      <p className="text-center py-2">
                        SIGN UP TO GET INSTANT ACCESS.
                      </p>
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
                          <Label className="text Muted">User Type:</Label>
                          <div className="input-group with-focus">
                            <Field
                              name="roleId"
                              type="number"
                              component="select"
                              values={values.roleId}
                              label="roleId"
                              className={
                                errors.roleId && touched.roleId
                                  ? "form-control error"
                                  : "form-control"
                              }
                              as="select"
                              multiple={false}
                            >
                              <option>--- Select User Type ---</option>
                              {this.state.roleId
                                ? this.state.roleId.map(this.mapRoleId)
                                : "Nothing"}
                            </Field>
                            {errors.industryTypeId &&
                              touched.industryTypeId && (
                                <span className="input-feedback">
                                  {errors.industryTypeId}
                                </span>
                              )}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <Label className="text-muted">Password</Label>
                          <div className="input-group with-focus">
                            <Field
                              name="password"
                              type={this.state.hidden ? "password" : "text"}
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
                            <div
                              className="input-group-append"
                              onClick={this.toggleView}
                              style={{ cursor: "pointer" }}
                              data-toggle="tooltip"
                              title="View Password"
                            >
                              <span className="input-group-text text-muted bg-transparent border-left-0">
                                {this.state.hidden ? (
                                  <em className="fa fa-eye-slash"></em>
                                ) : (
                                  <em className="fa fa-eye"></em>
                                )}
                              </span>
                            </div>
                          </div>
                          {errors.password && touched.password && (
                            <span className="input-feedback">
                              {errors.password}
                            </span>
                          )}
                          <PasswordStrengthBar
                            password={values.password}
                            shortScoreWord="*Min. 8 characters, one Uppercase letter and one number."
                            minLength={8}
                            scoreWords={[
                              "Weak",
                              "Weak",
                              "Good",
                              "Common passwords will appear as blue",
                              "Very nice!"
                            ]}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="text-muted">Retype Password</Label>
                          <div className="input-group with-focus">
                            <Field
                              name="confirmPassword"
                              type={this.state.hidden ? "password" : "text"}
                              value={values.confirmPassword}
                              placeholder=""
                              autoComplete="off"
                              label="confirmPassword"
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            <div
                              className="input-group-append"
                              onClick={this.toggleView}
                              style={{ cursor: "pointer" }}
                              data-toggle="tooltip"
                              title="View Password"
                            >
                              <span className="input-group-text text-muted bg-transparent border-left-0">
                                {this.state.hidden ? (
                                  <em className="fa fa-eye-slash"></em>
                                ) : (
                                  <em className="fa fa-eye"></em>
                                )}
                              </span>
                            </div>
                          </div>
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <span className="input-feedback">
                                {errors.confirmPassword}
                              </span>
                            )}
                        </FormGroup>
                        <Button
                          type="submit"
                          className="btn btn-block btn-info"
                          disabled={!isValid}
                        >
                          Register
                        </Button>
                        <p className="pt-3 text-center">Have an account?</p>
                        <Button
                          className="btn btn-block btn-secondary"
                          onClick={this.toLogInPage}
                        >
                          Log In
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
Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
export default Register;
