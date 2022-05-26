import classes from "./CRegister.module.css";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "formik";
import * as Yup from "yup";
import { Field } from "formik";
import { ErrorMessage } from "formik";
import UerServices from "./../../Services/services/UserServices";
import { success } from "../../utilties/Messagehandler";
import { error } from "./../../utilties/Messagehandler";
const CRegister = () => {
  let navigate = useNavigate();
  let signup = (name) => {
    navigate(name);
  };
  const handleFormSubmit = async (values) => {
    try {
      const data = await UerServices.Register(
        values.name,
        values.email,
        values.password,
        values.confirmPassword,
        values.phoneNo
      );

      success(data.message);
      navigate("/");
    } catch (e) {
      error(e.error);
    }
  };
  return (
    <div className={classes.main}>
      <div class="container">
        <div class="row">
          <div class=" col-md-6 d-md-none text-center d-block my-5">
            <div class={`text-white ${classes.head2}`}>Client Sign Up</div>
          </div>
          <div class="col-md-6">
            <div class={`card ${classes.LoginCard} m-auto`}>
              <div class="card-body">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    phoneNo: "",
                    confirmPassword: "",
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string()
                      .required("Name is Required")
                      .min(3, "name must be character long")
                      .max(20, "name must me smaller then 20 characters"),
                    email: Yup.string()
                      .email("Invalid email address format")
                      .required("Email is required"),
                    password: Yup.string()

                      .required("Please Enter your password")
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                      ),
                    phoneNo: Yup.number()
                      .min(3, "PhoneNo must be 11 characters at minimum")
                      .required("PhoneNo is required"),
                    confirmPassword: Yup.string().test(
                      "passwords-match",
                      "Passwords must match",
                      function (value) {
                        return this.parent.password === value;
                      }
                    ),
                  })}
                  onSubmit={handleFormSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <h2 className={classes.head1}>Create an Account</h2>
                      <div class="form-group">
                        <Field
                          name="name"
                          type="text"
                          placeholder="Enter name"
                          className="form-control"
                        />
                        <ErrorMessage
                          component="div"
                          name="name"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="email"
                          type="text"
                          placeholder="Enter email"
                          className="form-control"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          className="form-control"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="phoneNo"
                          type="number"
                          placeholder="Enter phoneNo"
                          className="form-control"
                        />
                        <ErrorMessage
                          component="div"
                          name="phoneNo"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Enter confirm Password"
                          className="form-control"
                        />
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          className="errorField"
                        />
                      </div>
                      <button
                        type="submit"
                        class={`btn text-white ${classes.login}
                  `}
                      >
                        Sign Up
                      </button>
                      <button
                        type="button"
                        class={`btn btn-outline-dark  ${classes.cancel}`}
                      >
                        Have an Account ?Login
                      </button>
                      <button
                        onClick={() => signup("/Selection")}
                        type="button"
                        class={`btn btn-outline-dark  ${classes.cancel}`}
                      >
                        Sign Up Selection
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div class=" col-md-6 d-md-inline d-none">
            <div class={`text-white ${classes.head2}`}>Client Sign Up</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRegister;
