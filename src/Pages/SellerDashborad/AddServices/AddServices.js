import "./AddServices.css";
import React from "react";
import { useAuth } from "../../../Services/provideMain";
import SubCategory from "../../../Services/services/subCategorybyCategory";
import { ErrorMessage, Formik } from "formik";
import { Form } from "formik";
import * as Yup from "yup";
import { Field } from "formik";
import ImageUploading from "react-images-uploading";
import { error, success } from "../../../utilties/Messagehandler";
import beautyService from "../../../Services/services/Servicesbeauty";
import { useLocation, useNavigate } from "react-router-dom";
const AddServices = () => {
  const { getUser, state } = useAuth();
  const [cat, setCat] = React.useState([]);
  const navigate = useNavigate();
  const { state: edit } = useLocation();
  const maxNumber = 1;
  const [initial, setInitial] = React.useState({
    ServiceName: "",
    ServiceCategory: "",
    ServiceCode: "",
    ServiceDescription: "",
    Price: "",
    address: "",
    flexRadioDefault: "",
  });

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    if (edit?.val) {
      SubCategory.getSubCategoryByCategory(getUser().categoryId?._id).then(
        (val) => {
          setCat(val.subcategory);
          setInitial({
            ...initial,
            ServiceName: edit.val.name,

            ServiceDescription: edit.val.detail,
            Price: edit.val.Price,
            flexRadioDefault: edit.val.ServiceType,
          });
        }
      );
    }
  }, []);
  React.useEffect(() => {
    if (!edit?.val) {
      SubCategory.getSubCategoryByCategory(getUser().categoryId?._id).then(
        (val) => {
          setCat(val.subcategory);
          setInitial({
            ...initial,
            ServiceCode:
              Math.floor(Math.random() * 1000 + 10 + Math.random() * 100 + 1) +
              getUser().categoryId._id,
          });
        }
      );
    }
  }, []);
  const handleFormSubmit = (values) => {
    try {
      console.log(2);
      if (!edit?.val) {
        if (images[0]) {
          navigate("/Quiz", {
            state: { values: values, image: images[0] },
          });
        } else {
          error("Please upload Logo");
        }
      } else {
        beautyService.EditServices(edit.val?._id, {
          Price: values.Price,
          detail: values.ServiceDescription,
          ServiceType: values.flexRadioDefault,
          name: values.ServiceName,
        });
        success("Sucessfully Edit");
        navigate("/Seller/ServiceListS");
      }
      // navigate("/");
    } catch (e) {
      error(e.error);
    }
  };
  return (
    <div class="py-5 mainAddService">
      <div class="card addServiceCard">
        <div class="card-title titleService">
          {!edit.val ? "Add Service Form" : "Edit Form"}
        </div>
        <div class="card-body">
          {!edit?.val ? (
            <Formik
              enableReinitialize={true}
              initialValues={initial}
              validationSchema={Yup.object().shape({
                ServiceName: Yup.string().required("ServiceName is Required"),
                ServiceCategory: Yup.string().required(
                  "Service Category is required"
                ),

                ServiceCode: Yup.string().required("Service Code is required"),
                ServiceDescription: Yup.string().required(
                  "Service Description is required"
                ),
                Price: Yup.number().required("Price is required"),
              })}
              onSubmit={handleFormSubmit}
            >
              {({ values, isSubmitting, validateForm, setTouched }) => (
                <Form>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="ServiceName" class="ServiceLabel">
                        Service Name
                      </label>
                      <Field
                        name="ServiceName"
                        type="text"
                        class="form-control ServiceTextfield"
                        id="ServiceName"
                      />
                      <ErrorMessage
                        component="div"
                        name="ServiceName"
                        className="errorField"
                      />
                      <div class="form-group">
                        <label for="ServiceCategory" class="ServiceLabel">
                          Service Category
                        </label>
                        <Field
                          as="select"
                          name="ServiceCategory"
                          class="form-control ServiceTextfield"
                          id="ServiceCategory"
                        >
                          <option>Select</option>
                          {cat.length > 0 &&
                            cat.map((subCat) => (
                              <option value={subCat._id}>{subCat.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage
                          component="div"
                          name="ServiceCategory"
                          className="errorField"
                        />
                      </div>
                      <label for="ServiceCode" class="ServiceLabel">
                        Service Code
                      </label>
                      <Field
                        name="ServiceCode"
                        readOnly={true}
                        class="form-control ServiceTextfield"
                        id="ServiceCode"
                        placeholder="Service code will be auto-generated"
                      />
                      <ErrorMessage
                        component="div"
                        name="ServiceCode"
                        className="errorField"
                      />
                      <label for="ServicePrice" class="ServiceLabel">
                        Price (PKR)*
                      </label>
                      <Field
                        name="Price"
                        type="number"
                        class="form-control ServiceTextfield"
                        id="ServicePrice"
                      />
                      <ErrorMessage
                        component="div"
                        name="Price"
                        className="errorField"
                      />
                      <label for="ServicePrice" class="ServiceLabel">
                        Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        class="form-control ServiceTextfield"
                        id="ServiceName"
                      />
                      <ErrorMessage
                        component="div"
                        name="Address"
                        className="errorField"
                      />
                      {/* <div class="form-group">
                <label for="BookingPayment" class="ServiceLabel">
                  Booking Payment Percentage*
                </label>
                <select
                  class="form-control ServiceTextfield"
                  id="BookingPayment"
                >
                  <option>Full Payment</option>
                  <option>50% Advance Payment</option>
                  <option>25% Advance Payment</option>
                  <option>Custom Payment</option>
                </select>
              </div> */}
                    </div>
                    <div class="col-md-6">
                      {/* <button type="button" class="btn qbutton">
                  Fill Questionnare{" "}
                  <i
                    class="fa-regular fa-circle-question pr-2"
                    aria-hidden="true"
                  ></i>
                </button> */}
                      Add Service Image
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
                      <label class="ServiceLabel">
                        Select your Service Type in terms of Price Range
                      </label>
                      <div class="form-check">
                        <Field
                          value="Luxury"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Luxury
                        </label>
                      </div>
                      <div class="form-check">
                        <Field
                          value="Affordable"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Affordable
                        </label>
                      </div>
                      <div class="form-check">
                        <Field
                          value="LowCost"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Low Cost
                        </label>
                      </div>
                      <ErrorMessage
                        component="div"
                        name="flexRadioDefault"
                        className="errorField"
                      />
                    </div>
                  </div>
                  <label for="ServiceDescription" class="ServiceLabel">
                    Service Description
                  </label>
                  <Field
                    type="text"
                    name="ServiceDescription"
                    as="textarea"
                    class="form-control descriptiontextfield"
                    id="ServiceDescription"
                    placeholder="Enter your service description"
                  />
                  <ErrorMessage
                    component="div"
                    name="ServiceDescription"
                    className="errorField"
                  />
                  <div class="btndiv">
                    <button type="submit" class="btn btn-lg btn-dark submitbtn">
                      SUBMIT
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={initial}
              validationSchema={Yup.object().shape({
                ServiceName: Yup.string().required("ServiceName is Required"),

                ServiceDescription: Yup.string().required(
                  "Service Description is required"
                ),
                Price: Yup.number().required("PhoneNo is required"),
              })}
              onSubmit={handleFormSubmit}
            >
              {({ values, isSubmitting, validateForm, setTouched }) => (
                <Form>
                  <div class="row">
                    <div class="col-md-6">
                      <label for="ServiceName" class="ServiceLabel">
                        Service Name
                      </label>
                      <Field
                        name="ServiceName"
                        type="text"
                        class="form-control ServiceTextfield"
                        id="ServiceName"
                      />
                      <ErrorMessage
                        component="div"
                        name="ServiceName"
                        className="errorField"
                      />

                      <label for="ServicePrice" class="ServiceLabel">
                        Price (PKR)*
                      </label>
                      <Field
                        name="Price"
                        type="number"
                        class="form-control ServiceTextfield"
                        id="ServicePrice"
                      />
                      <ErrorMessage
                        component="div"
                        name="Price"
                        className="errorField"
                      />
                      {/* <div class="form-group">
              <label for="BookingPayment" class="ServiceLabel">
                Booking Payment Percentage*
              </label>
              <select
                class="form-control ServiceTextfield"
                id="BookingPayment"
              >
                <option>Full Payment</option>
                <option>50% Advance Payment</option>
                <option>25% Advance Payment</option>
                <option>Custom Payment</option>
              </select>
            </div> */}
                    </div>
                    <div class="col-md-6">
                      {/* <button type="button" class="btn qbutton">
                Fill Questionnare{" "}
                <i
                  class="fa-regular fa-circle-question pr-2"
                  aria-hidden="true"
                ></i>
              </button> */}

                      <label class="ServiceLabel">
                        Select your Service Type in terms of Price Range
                      </label>
                      <div class="form-check">
                        <Field
                          value="Luxury"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Luxury
                        </label>
                      </div>
                      <div class="form-check">
                        <Field
                          value="Affordable"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Affordable
                        </label>
                      </div>
                      <div class="form-check">
                        <Field
                          value="LowCost"
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Low Cost
                        </label>
                      </div>
                      <ErrorMessage
                        component="div"
                        name="flexRadioDefault"
                        className="errorField"
                      />
                    </div>
                  </div>
                  <label for="ServiceDescription" class="ServiceLabel">
                    Service Description
                  </label>
                  <Field
                    type="text"
                    name="ServiceDescription"
                    as="textarea"
                    class="form-control descriptiontextfield"
                    id="ServiceDescription"
                    placeholder="Enter your service description"
                  />
                  <ErrorMessage
                    component="div"
                    name="ServiceDescription"
                    className="errorField"
                  />
                  <div class="btndiv">
                    <button type="submit" class="btn btn-lg btn-dark submitbtn">
                      SUBMIT
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddServices;
