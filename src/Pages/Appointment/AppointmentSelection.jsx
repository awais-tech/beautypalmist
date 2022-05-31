import { getValue } from "@testing-library/user-event/dist/utils";
import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DatePicker from "sassy-datepicker";
import Swal from "sweetalert2";
import { useAuth } from "../../Services/provideMain";
import bookingServices from "../../Services/services/booking";
import { error } from "../../utilties/Messagehandler";

function AppointmentSelection() {
  const [value, setdats] = useState(new Date());
  const [timer, changeTime] = useState("No Select");
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = React.useState([]);
  const [time, setTime] = React.useState([
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
  ]);
  const [oriTime, setOriTime] = React.useState([
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
  ]);
  const [ori, setOri] = React.useState([]);
  console.log(location.state.info);
  let { state: check, saveBooking } = useAuth();
  const setdates = (e) => {
    setBook(
      ori
        .filter(
          (val) =>
            val.Date.toString() == moment(e).format("Do MMM YYYY").toString() &&
            val.status == 4
        )
        .map((val) => val.Time)
    );
    setdats(e);
  };
  console.log(book);
  const saveTime = (t) => {
    changeTime(t);
  };
  React.useEffect(() => {
    setTime(oriTime.filter((val) => !book.includes(val)));
  }, [value]);
  const loginfirst = () => {
    navigate("/Clogin", {
      state: { info: location.state.info, from: location },
    });
  };
  React.useEffect(() => {
    bookingServices.serviceBookings(location.state.info._id).then((val) => {
      setBook(val.Booking);
      setOri(val.Booking);
    });
  }, []);
  const move = () => {
    if (!check.auth) {
      Swal.fire({
        title: "Detail",
        html: `
            <h2>You need to Login first Before conitinue</h2>
          
        `,

        confirmButtonText: "Ok",
      }).then(() => {
        loginfirst();
      });
    } else {
      if (!timer.includes("No Select")) {
        saveBooking({
          date: moment(value).format("Do MMM YYYY"),
          timer,
          ...location.state.info,
        });
        navigate("/AppointmentDetails", {
          state: { info: location.state.info },
        });
      } else {
        error("Please Select Date");
      }
    }
  };
  return (
    <div className="main">
      <div className="heading_contaier">
        <h1 className="heading">
          {location.state.info.name} -{" "}
          {location.state.info?.BussnesId?.bussnessname ||
            location.state.info?.userid.name}{" "}
        </h1>
        <p className="heading_paragraph">
          Request a time slot suitable for you. Your request will be accepted if
          the slot is available otherwise you will be suggested an alternate
          slot for this service.
        </p>
      </div>
      <div className="container">
        <div className="DateandTime row">
          <div className=" col-md-6">
            <div className="DatePicker">
              <h2 className="selectedheading">
                Select Requested Date and Time
              </h2>

              <div className="selection_sector">
                <DatePicker
                  onChange={setdates}
                  selected={value}
                  minDate={new Date(Date.now())}
                />

                <div className="buttons">
                  <p>Timezone: Pakistan Standard time (GMT+5)</p>
                  {time.length > 0 &&
                    time.map((val, index) => (
                      <div className="botn">
                        <button
                          type="button"
                          onClick={() => saveTime(val)}
                          class="btn btn-light padding"
                        >
                          {val}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className=" col-md-5">
            <h2 className="selectionheading">Booking Summary</h2>
            <h6>
              {" "}
              <b>
                {" "}
                {location.state.info.name} -{" "}
                {location.state.info?.BussnesId?.bussnessname ||
                  location.state.info?.userid.name}{" "}
              </b>{" "}
            </h6>
            <h6>
              {moment(value).format("Do MMM YYYY")} {timer}
            </h6>
            <p>1 hr</p>
            <p>Rs {location.state.info.Price}</p>
            <button
              class="btn btn-success batn"
              type="button"
              onClick={() => move("/AppointmentDetails")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSelection;
