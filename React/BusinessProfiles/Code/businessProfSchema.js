import * as Yup from "yup";

const businessProfSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too Short")
    .max(100, "Business Profiles name should be less than 100 characters")
    .required("Business Name is required."),
  businessStageId: Yup.string().required("Business Stage is required"),
  businessTypeId: Yup.string().required("Business Type is required"),
  industryTypeId: Yup.string().required("Industry Type is required"),
  projectedAnnualBusinessIncome: Yup.string(),
  annualBusinessIncome: Yup.string(),
  yearsInBusiness: Yup.number(),
  imageUrl: Yup.string()
    .min(1, "Too short")
    .max(255, "Image URL should be less than 255 characters"),
  addressId: Yup.number()
});
export default businessProfSchema;
