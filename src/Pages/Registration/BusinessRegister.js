import classes from "./BRegister.module.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { error, success } from "../../utilties/Messagehandler";
import bussnessServices from "../../Services/services/bussnessuser";
import UerServices from "./../../Services/services/UserServices";
import { useEffect } from "react";
import Category from "../../Services/services/CategoryServices";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
const BRegister = () => {
  let navigate = useNavigate();

  const [initial, setInitial] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    confirmPassword: "",
    address: "",
    bussnessName: "",
    bussnessStatus: "",
    account: "",
    about: "",

    bussnessCategory: "",
  });
  const [cat, setcat] = useState([]);
  let signup = (name) => {
    navigate(name);
  };

  useEffect(() => {
    Category.getCategory().then((val) => {
      setcat(val.category);
    });
  }, []);
  const handleFormSubmit = async (values) => {
    try {
      if (images[0]) {
        UerServices.Register(
          values.name,
          values.email,
          values.password,
          values.confirmPassword,
          values.phoneNo,
          "bussness",
          0
        )
          .then((data) => {
            const formData = new FormData();

            formData.append("address", values.address);
            formData.append("categoryId", values.bussnessCategory);
            formData.append("userId", data.id);
            formData.append("bussnessstatus", values.bussnessStatus);
            formData.append("bussnessname", values.bussnessName);
            formData.append("accountLink", values.account);
            formData.append("cnic", images[0].file);
            formData.append("about", values.about);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };
            console.log(33544);
            bussnessServices.addBussness(formData, config).then(() => {
              success(
                "Your Accout is Registered You can when your application approved"
              );
              navigate("/Business");
            });
          })
          .catch((e) => {
            error(e.error);
          });
      } else {
        error("Please upload Cnic Front image");
      }
      // navigate("/");
    } catch (e) {
      error(e.error);
    }
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  return (
    <div className={classes.main}>
      <div class="container">
        <h1 className={classes.head1}>Business Sign Up</h1>
        <div class="card ff">
          <div class="card-body">
            <Formik
              enableReinitialize={true}
              initialValues={initial}
              validationSchema={Yup.object().shape({
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
                bussnessStatus: Yup.string().required(
                  "Bussness Status is Required"
                ),
                name: Yup.string()
                  .required()
                  .min(3, "name must be character long")
                  .max(20, "name must me smaller then 20 characters"),
                about: Yup.string()
                  .min(25, "Please enter atleast 25 charcater")
                  .required("About is required"),
                address: Yup.string().required("address is required"),

                bussnessName: Yup.string().required(
                  "bussnesss Name is Required"
                ),
                bussnessCategory: Yup.string().required(
                  "Category Name is Required"
                ),
              })}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <Field
                          name="bussnessName"
                          type="text"
                          class="form-control"
                          placeholder="Company/Business Name"
                        />
                        <ErrorMessage
                          component="div"
                          name="bussnessName"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="email"
                          type="email"
                          class="form-control"
                          placeholder="Email ID"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="address"
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Location, Address"
                        />
                        <ErrorMessage
                          component="div"
                          name="address"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="password"
                          type="password"
                          class="form-control"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="errorField"
                        />
                      </div>
                      <div class="form-group">
                        <Field
                          name="confirmPassword"
                          type="password"
                          class="form-control"
                          placeholder=" Confirm Password"
                        />
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          className="errorField"
                        />
                      </div>

                      <div class="form-group">
                        <Field
                          name="name"
                          type="text"
                          class="form-control"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          component="div"
                          name="name"
                          className="errorField"
                        />
                      </div>
                      <label class={classes.lib}>
                        Select Your Service Category
                      </label>

                      <Field
                        as="select"
                        name="bussnessCategory"
                        className="form-select"
                      >
                        <option value="no Select">Select</option>
                        {cat.map((cat) => (
                          <>
                            <option value={cat._id}>{cat.name}</option>
                          </>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="bussnessCategory"
                        className="errorField"
                      />
                    </div>
                    <div class=" col-md-6">
                      <div class="form-group">
                        <Field
                          name="phoneNo"
                          type="number"
                          class="form-control"
                          placeholder="Phoneno"
                        />
                        <ErrorMessage
                          component="div"
                          name="phoneNo"
                          className="errorField"
                        />
                      </div>
                      <label class={classes.lib}>
                        What is your business status?
                      </label>
                      <Field
                        as="select"
                        name="bussnessStatus"
                        className="form-select"
                      >
                        <option value="Registered">Select</option>
                        <option value="Registered Bussness">
                          Registered Bussness
                        </option>
                        <option value="Small Bussness">Small Bussness</option>
                        <option value="Home Bussness">Home Bussness</option>
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="bussnessStatus"
                        className="errorField"
                      />

                      <label class={classes.lib}>
                        Attach CNIC (Small Business/Home Based)
                      </label>
                      <ImageUploading
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Click or Drop here
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              onClick={onImageRemoveAll}
                              className="btn btn-primary"
                            >
                              Remove all images
                            </button>
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  width="100"
                                />
                                <div className="image-item__btn-wrapper">
                                  <button
                                    className="btn"
                                    onClick={() => onImageUpdate(index)}
                                    type="button"
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="btn"
                                    onClick={() => onImageRemove(index)}
                                    type="button"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>

                      <div class="form-group">
                        <Field
                          type="text"
                          name="account"
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter Account Link"
                        />
                        <ErrorMessage
                          component="div"
                          name="account"
                          className="errorField"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label class={classes.lib}>About</label>
                    <div class="form-group">
                      <Field
                        style={{ height: "100px !important" }}
                        name="about"
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        placeholder="Give description about your services, experience and achievements"
                      />
                      <ErrorMessage
                        component="div"
                        name="about"
                        className="errorField"
                      />
                    </div>
                    <div className="m-auto text-center">
                      <button
                        type="submit"
                        class={`btn text-white w-50 text-center ${classes.login}
                  `}
                      >
                        {isSubmitting ? "Please wait..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="text-center">
              <button
                onClick={() => signup("/Business")}
                type="submit"
                class={`btn btn-outline-dark w-50 mx-2  ${classes.cancel}`}
              >
                Have an Account ?Login
              </button>
              <button
                onClick={() => signup("/Selection")}
                type="submit"
                class={`btn btn-outline-dark w-50  ${classes.cancel}`}
              >
                Sign Up Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BRegister;
