import React from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { useAuth } from "../../../Services/provideMain";
import bookingServices from "../../../Services/services/booking";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [service, setServices] = React.useState([]);
  const [review, setReview] = React.useState([]);
  const navigate = useNavigate();
  const { state, refresh } = useAuth();
  React.useEffect(() => {
    bookingServices.getBooking(state.user._id).then((val) => {
      setServices(
        val.Booking.filter(
          (val) =>
            val.status == 4 &&
            moment(formatDate(val.Date))
              .startOf("day")
              .fromNow()
              .includes("ago")
        )
      );
    });
  }, [refresh]);
  React.useEffect(() => {
    if (service.length > 0) {
      console.log(service);
      bookingServices.getReviews().then((val) => {
        setReview(val.Reviews);
      });
    }
  }, [service]);

  const get = (vals) => {
    console.log(review.some((val) => val.ServiceId == vals));
    return review.some((val) => val.BookId == vals);
  };
  const move = (val) => {
    navigate("/review", { state: { info: val } });
  };
  function formatDate(date) {
    let main = date.replace("th", "");
    var d = new Date(main),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return (
    <ul class="list-group">
      <li class="list-group-item">
        {service.length > 0 ? (
          service.map((val) => (
            <div class="row py-2">
              <div class="col-md-6">
                <h5>{val?.ServiceId?.name}</h5>
                <h5 class="servicepro">{val.OwnerId?.name}</h5>
                <h6 class="info">
                  Date:{val.Date} Time: {val.Time} Price {val.Price} id:{" "}
                  {val._id.substr(1, 5)}
                </h6>
              </div>
              <div class="col-md-6">
                <div class="row">
                  {!get(val?._id) && (
                    <button
                      type="button"
                      class="btn btn-outline-dark actionbtn"
                      onClick={() => move(val)}
                    >
                      Give Feedback
                    </button>
                  )}
                  <button
                    type="button"
                    class="btn btn-outline-dark actionbtn"
                    onClick={() =>
                      Swal.fire({
                        title: "Detail",
                        html: `
                          <div style="font-weight:bold">Price:${val.Price}</div>
                          <div style="font-weight:bold">Building:${val.Building}</div>
                          <div style="font-weight:bold">Address:${val.Address}</div>
                          <div style="font-weight:bold">City:${val.City}</div>
                          <div style="font-weight:bold">State:${val.State}</div>
                          <div style="font-weight:bold">Message:${val.Message}</div>
                          <h3>Payment Screenshot</h3>
                          <img src="http://localhost:3000/${val.screenshot}" />
                          
                         
                      `,

                        confirmButtonText: "Ok",
                      })
                    }
                  >
                    View Booking Form
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Booking</h1>
        )}
      </li>
    </ul>
  );
};

export default History;
