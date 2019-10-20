import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Col, Form, FormGroup, Label, Button } from "reactstrap";
import businessProfSchema from "./businessProfSchema";
import withFileUpload from "../files/withFileUpload";
import * as businessProfilesService from "../../services/businessProfilesService";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import swal from "sweetalert";
import Swal from "sweetalert2";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import styles from "./businessProfStyle.module.css";
import logger from "sabio-debug";
const _logger = logger.extend("BusinessProfileForm");
class BusinessProfileForm extends Component {
  state = {
    formData: {
      name: "",
      businessStageId: "",
      businessTypeId: "",
      industryTypeId: "",
      projectedAnnualBusinessIncome: "",
      annualBusinessIncome: "",
      yearsInBusiness: "",
      imageUrl: "",
      addressId: ""
    },
    dropDown: "",

    isEditing: false
  };
  componentDidMount() {
    this.fillDropDown();
    if (this.props.match.params.id) {
      businessProfilesService
        .selectById(this.props.match.params.id)
        .then(this.prePopulatedSuccess)
        .catch(this.prePopulatedError);
    }
  }
  prePopulatedSuccess = data => {
    const newFormData = data.item;
    this.setState(prevState => {
      return {
        formData: {
          id: newFormData.id,
          name: newFormData.name,
          businessStageId: newFormData.businessStageId.id,
          businessTypeId: newFormData.businessTypeId.id,
          industryTypeId: newFormData.industryTypes.id,
          projectedAnnualBusinessIncome:
            newFormData.projectedAnnualBusinessIncome,
          annualBusinessIncome: newFormData.annualBusinessIncome,
          yearsInBusiness: newFormData.yearsInBusiness,
          imageUrl: newFormData.imageUrl,
          addressId: newFormData.addressId
        },
        isEditing: !prevState.isEditing
      };
    });
  };
  prePopulatedError = err => {
    _logger(err);
  };
  fillDropDown = () => {
    businessProfilesService
      .getAdditionalInfo()
      .then(this.dropDownSuccess)
      .catch(this.dropDownError);
  };
  dropDownSuccess = response => {
    this.setState({
      dropDown: response.item
    });
    _logger("dropDownSuccess", response);
  };
  dropDownError = err => {
    _logger(err);
  };
  mapBusinessType = businessType => {
    return (
      <option key={businessType.id} value={businessType.id}>
        {businessType.name}
      </option>
    );
  };
  mapIndustryType = industry => {
    return (
      <option key={industry.id} value={industry.id}>
        {industry.name}
      </option>
    );
  };
  mapBusinessStage = busStage => {
    return (
      <option key={busStage.id} value={busStage.id}>
        {busStage.name}
      </option>
    );
  };
  currencyFormat = num => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  handleSubmit = values => {
    this.props
      .upload(values)
      .then(this.uploadSuccess)
      .catch(this.uploadError);
  };
  uploadSuccess = values => {
    if (this.state.isEditing) {
      if (
        values.annualBusinessIncome &&
        typeof values.annualBusinessIncome === typeof "s"
      ) {
        values.annualBusinessIncome = this.stringMoneyToInteger(
          values.annualBusinessIncome
        );
      }
      if (
        values.projectedAnnualBusinessIncome &&
        typeof values.projectedAnnualBusinessIncome === typeof "s"
      ) {
        values.projectedAnnualBusinessIncome = this.stringMoneyToInteger(
          values.projectedAnnualBusinessIncome
        );
      }
      businessProfilesService
        .updateBusProf(values)
        .then(this.updateSuccess)
        .catch(this.updateError);
    } else {
      if (
        values.annualBusinessIncome &&
        typeof values.annualBusinessIncome === typeof "s"
      ) {
        values.annualBusinessIncome = this.stringMoneyToInteger(
          values.annualBusinessIncome
        );
      }
      if (
        values.projectedAnnualBusinessIncome &&
        typeof values.projectedAnnualBusinessIncome === typeof "s"
      ) {
        values.projectedAnnualBusinessIncome = this.stringMoneyToInteger(
          values.projectedAnnualBusinessIncome
        );
      }
      businessProfilesService
        .postBusProf(values)
        .then(this.postSuccess)
        .catch(this.postError);
    }
  };
  updateSuccess = () => {
    swal("Success!", "Business Profile was updated.", "success");
    this.props.history.push("/business");
  };

  postSuccess = () => {
    swal("Success!", "Business Profile was added.", "success");
    this.props.history.push("/business");
  };

  postError = () => {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Please check the required fields."
    });
  };
  updateError = () => {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Please check the required fields."
    });
  };
  stringMoneyToInteger = currency => {
    var dollarSplit = currency.split("$ ")[1];
    var sepArr = dollarSplit.split(",");
    var withoutSign = sepArr.join("");
    var intoInt = parseInt(withoutSign);
    return intoInt;
  };
  backHome = () => {
    this.props.history.push(`/business`);
  };
  render() {
    const numberMask = createNumberMask({
      prefix: "$ ",
      suffix: ""
    });
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={businessProfSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              handleChange,
              handleReset,
              isValid,
              setFieldValue
            } = props;
            return (
              <div className="row">
                <div className={`${styles.busProForm} col-md-9`}>
                  <div className="card card-default">
                    <div className="card-header">
                      <h2>Business Profiles</h2>
                    </div>

                    <div className="card-body">
                      <Form className="form-horizontal" onSubmit={handleSubmit}>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Business Name
                          </Label>
                          <Col>
                            <Field
                              name="name"
                              type="text"
                              value={values.name}
                              placeholder=""
                              autoComplete="off"
                              label="name"
                              className={
                                errors.name && touched.name
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.name && touched.name && (
                              <span className="input-feedback">
                                {errors.name}
                              </span>
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Business Type
                          </Label>
                          <Col>
                            <Field
                              name="businessTypeId"
                              type="number"
                              component="select"
                              values={values.businessTypeId}
                              label="businessTypeId"
                              className={
                                errors.businessTypeId && touched.businessTypeId
                                  ? "form-control error"
                                  : "form-control"
                              }
                              as="select"
                              multiple={false}
                            >
                              <option>Select Business Type</option>
                              {this.state.dropDown.businessTypeId
                                ? this.state.dropDown.businessTypeId.map(
                                    this.mapBusinessType
                                  )
                                : "Nothing"}
                            </Field>
                            {errors.businessTypeId &&
                              touched.businessTypeId && (
                                <span className="input-feedback">
                                  {errors.businessTypeId}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Business Stage
                          </Label>
                          <Col>
                            <Field
                              name="businessStageId"
                              type="number"
                              component="select"
                              values={values.businessStageId}
                              label="businessStageId"
                              className={
                                errors.businessStageId &&
                                touched.businessStageId
                                  ? "form-control error"
                                  : "form-control"
                              }
                              as="select"
                              multiple={false}
                            >
                              <option>Select Business Stage</option>
                              {this.state.dropDown.businessStageId
                                ? this.state.dropDown.businessStageId.map(
                                    this.mapBusinessStage
                                  )
                                : "Nothing"}
                            </Field>
                            {errors.businessTypeId &&
                              touched.businessTypeId && (
                                <span className="input-feedback">
                                  {errors.businessTypeId}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Industry Type
                          </Label>
                          <Col>
                            <Field
                              name="industryTypeId"
                              type="number"
                              component="select"
                              values={values.industryTypeId}
                              label="industryTypeId"
                              className={
                                errors.industryTypeId && touched.industryTypeId
                                  ? "form-control error"
                                  : "form-control"
                              }
                              as="select"
                              multiple={false}
                            >
                              <option>Select Industry Type</option>
                              {this.state.dropDown.industryTypeId
                                ? this.state.dropDown.industryTypeId.map(
                                    this.mapIndustryType
                                  )
                                : "Nothing"}
                            </Field>
                            {errors.industryTypeId &&
                              touched.industryTypeId && (
                                <span className="input-feedback">
                                  {errors.industryTypeId}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Projected Annual Income
                          </Label>
                          <Col>
                            <Field
                              name="projectedAnnualBusinessIncome"
                              render={({ field }) => (
                                <MaskedInput
                                  mask={numberMask}
                                  {...field}
                                  type="text"
                                  onChange={handleChange}
                                  placeholder=""
                                  value={values.projectedAnnualBusinessIncome}
                                  autoComplete="off"
                                  label="projectedAnnualBusinessIncome"
                                  className={
                                    errors.projectedAnnualBusinessIncome &&
                                    touched.projectedAnnualBusinessIncome
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                />
                              )}
                            />
                            {errors.projectedAnnualBusinessIncome &&
                              touched.projectedAnnualBusinessIncome && (
                                <span className="input-feedback">
                                  {errors.projectedAnnualBusinessIncome}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Annual Business Income
                          </Label>
                          <Col>
                            <Field
                              name="annualBusinessIncome"
                              render={({ field }) => (
                                <MaskedInput
                                  mask={numberMask}
                                  {...field}
                                  type="text"
                                  onChange={handleChange}
                                  placeholder=""
                                  value={values.annualBusinessIncome}
                                  autoComplete="off"
                                  label="annualBusinessIncome"
                                  className={
                                    errors.annualBusinessIncome &&
                                    touched.annualBusinessIncome
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                />
                              )}
                            />

                            {errors.annualBusinessIncome &&
                              touched.annualBusinessIncome && (
                                <span className="input-feedback">
                                  {errors.annualBusinessIncome}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Years in Business
                          </Label>
                          <Col>
                            <Field
                              name="yearsInBusiness"
                              type="number"
                              value={values.yearsInBusiness}
                              placeholder=""
                              autoComplete="off"
                              label="yearsInBusiness"
                              className={
                                errors.yearsInBusiness &&
                                touched.yearsInBusiness
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.yearsInBusiness &&
                              touched.yearsInBusiness && (
                                <span className="input-feedback">
                                  {errors.yearsInBusiness}
                                </span>
                              )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Business Image
                          </Label>
                          <Col>
                            {this.props.render(
                              setFieldValue,
                              errors.imageUrl,
                              touched.imageUrl,
                              values.imageUrl,
                              "imageUrl"
                            )}
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label className="col-xl-2 col-form-label">
                            Address_UnderConstruction
                          </Label>
                          <Col>
                            <Field
                              name="addressId"
                              type="number"
                              value={values.addressId}
                              placeholder=""
                              autoComplete="off"
                              label="addressId"
                              className={
                                errors.addressId && touched.addressId
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.addressId && touched.addressId && (
                              <span className="input-feedback">
                                {errors.addressId}
                              </span>
                            )}
                          </Col>
                        </FormGroup>

                        <FormGroup className={styles.buttonsAddForm}>
                          <Button
                            className="btn-oval btn-danger"
                            onClick={this.backHome}
                            style={{ float: "left" }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="btn btn-oval btn-info"
                            onClick={handleReset}
                          >
                            Reset
                          </Button>
                          <Button
                            type="submit"
                            className="btn btn-oval btn-info"
                            disabled={!isValid}
                          >
                            {this.state.isEditing ? "Update" : "Add Business"}
                          </Button>
                        </FormGroup>
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
BusinessProfileForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  render: PropTypes.func,
  upload: PropTypes.func
};
export default withFileUpload(BusinessProfileForm);
