import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/provideMain";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "formik";
import { Field } from "formik";
import bookingServices from "../../Services/services/booking";
import Swal from "sweetalert2";
const BookingDetail = () => {
  const { state } = useAuth();
  const { state: data } = useLocation();
  const [clients, setClients] = React.useState(1);
  const navigation = useNavigate();
  const [init, setInit] = React.useState({
    name: state.user?.name,
    email: state.user?.email,
    phoneno: state.user?.phoneNo,
    Message: "",
    state: "",
    city: "",
    building: "",
    address: "",
  });
  const handleFormSubmit = (values) => {
    console.log(values);
    console.log(clients * data.info?.Price);
    console.log(state.bookingInfo);
    bookingServices
      .addBooking({
        NumberClients: Number,
        Price: clients * data.info?.Price,
        Address: values.address,

        Building: values.building,
        City: values.city,
        State: values.state,
        Message: values.message,
        Date: state.bookingInfo.date,
        Time: state.bookingInfo.timer,

        ServiceId: state.bookingInfo._id,
        UserId: state.user._id,
        OwnerId: data.info.userid._id,
      })
      .then((val) => {
        Swal.fire("Booking Request has been sent").then((val) => {
          navigation("/MyBooking");
        });
      });
  };
  return (
    <div class="py-5 mainBookingContainer">
      <div class="card mx-auto ClientBookFormCard shadow-lg">
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <Formik initialValues={init} onSubmit={handleFormSubmit}>
                {({ values, isSubmitting, validateForm, setTouched }) => (
                  <Form>
                    <h3>Fill out your details</h3>
                    <hr class="solid" />
                    <div class="row">
                      <div class="col-md-6">
                        <label for="Name" class="form-label BookLabels">
                          Name<span class="star">*</span>
                        </label>
                        <Field
                          type="text"
                          class="form-control inputTextfields"
                          id="Name"
                          name="name"
                          readOnly={true}
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="Contact" class="form-label BookLabels">
                          Contact Number<span class="star">*</span>
                        </label>
                        <Field
                          type="tel"
                          readOnly={true}
                          class="form-control inputTextfields"
                          name="phoneno"
                          id="Contact"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 NoteMsg">
                        <label>
                          <span class="star">Note:</span> You cannot change your
                          Email Id. Update it in profile settings.
                        </label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label for="Email" class="form-label BookLabels">
                          Email<span class="star">*</span>
                        </label>
                        <Field
                          type="email"
                          class="form-control inputTextfields"
                          id="Email"
                          name="email"
                          readOnly={true}
                        />
                        <label for="Address" class="form-label BookLabels">
                          Address<span class="star">*</span>
                        </label>
                        <Field
                          type="text"
                          class="form-control inputTextfields"
                          id="address"
                          name="address"
                        />
                        <label for="City" class="form-label BookLabels">
                          City<span class="star">*</span>
                        </label>
                        <Field
                          name="city"
                          type="text"
                          class="form-control inputTextfields"
                          id="City"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="NoOfClients" class="form-label BookLabels">
                          Number of Clients<span class="star">*</span>
                        </label>
                        <input
                          onChange={(e) => setClients(e.target.value)}
                          value={clients}
                          type="number"
                          class="form-control inputTextfields"
                          id="NoOfClients"
                        />
                        <label
                          for="BuildingFloor"
                          class="form-label BookLabels"
                        >
                          Building/Floor<span class="star">*</span>
                        </label>
                        <Field
                          name="building"
                          type="text"
                          class="form-control inputTextfields"
                          id="BuildingFloor"
                        />
                        <label for="State" class="form-label BookLabels">
                          State<span class="star">*</span>
                        </label>
                        <Field
                          as="select"
                          name="state"
                          class="form-select inputTextfields"
                          aria-label="Select State"
                        >
                          <option>State</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="KPK">KPK</option>
                          <option value="Balochistan">Balochistan</option>
                        </Field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <label for="Message" class="form-label BookLabels">
                          Message<span class="star">*</span>
                        </label>
                        <Field
                          name="message"
                          type="text"
                          class="form-control inputTextfields"
                          id="Message"
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn paybtn btn-success batn">
                      Book Now
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div class="col-md-4">
              <h3>Booking Summary</h3>
              <hr class="solid" />
              <div class="row Paymentrow">
                <div class="col-md-6">
                  <h5 class="floatstart">
                    Service Name :<b>{data.info.name}</b>
                  </h5>
                </div>
                <div class="col-md-6">
                  <h5 class="floatend">...</h5>
                </div>
              </div>
              <div class="row Paymentrow">
                <div class="col-md-6">
                  <h5 class="floatstart">
                    Date {state.bookingInfo.date}& Time{" "}
                    {state.bookingInfo.timer}
                  </h5>
                </div>
                <div class="col-md-6">
                  <h5 class="floatend">...</h5>
                </div>
              </div>
              <div class="row Paymentrow">
                <div class="col-md-6">
                  <h5 class="floatstart">
                    Location <b>{data.info?.address || "Not Available"}</b>
                  </h5>
                </div>
                <div class="col-md-6">
                  <h5 class="floatend">...</h5>
                </div>
              </div>

              <hr class="solid" />
              <h4>Payment Details</h4>
              <div class="row Paymentrow">
                <div class="col-md-6">
                  <h5 class="floatstart">
                    Total: <b>{Number(clients) * Number(data.info?.Price)} </b>
                  </h5>
                </div>
                <div class="col-md-6">
                  <h5 class="floatend">...</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
