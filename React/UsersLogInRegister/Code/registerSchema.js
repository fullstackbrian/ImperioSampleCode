import * as Yup from "yup";
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(5, "Email should be minimum 5 characters")
    .max(50, "Email should be less than 50 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password should be more than 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter this field. Passwords should match"),
  roleId: Yup.string().required()
});
export default registerSchema;
