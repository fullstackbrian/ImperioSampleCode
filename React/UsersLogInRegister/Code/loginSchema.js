import * as Yup from "yup";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(5, "Email should be minimum 5 characters")
    .max(50, "Email should be less than 50 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password should be more than 8 characters")
    .required("Password is required")
});
export default loginSchema;
