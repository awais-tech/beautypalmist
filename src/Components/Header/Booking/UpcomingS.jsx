import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../Services/provideMain";
import bookingServices from "../../../Services/services/booking";
import moment from "moment";

const UpcomingS = () => {
  const [service, setServices] = React.useState([]);
  const { state, refresh, refetch } = useAuth();
  React.useEffect(() => {
    bookingServices.getOwnerBooking(state.user._id).then((val) => {
      setServices(
        val.Booking.filter(
          (val) =>
            val.status === 4 &&
            !moment(formatDate(val.Date))
              .startOf("day")
              .fromNow()
              .includes("ago")
        )
      );
      console.log(val);
    });
  }, [refresh]);
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
  const updateBooking = async (id, value) => {
    Swal.fire({
      title: "Are You Sure You want to cancel it",
      showDenyButton: true,

      confirmButtonText: "Yes",
    }).then(async (s) => {
      if (s.isConfirmed) {
        await bookingServices.updatebooking(id, {
          status: value,
          canceledBy: "Owner",
        });

        refetch();
        Swal.fire(`Booking ${value == 2 ? "Rejected" : "approved"}`);
      } else {
        Swal.fire(`Booking not ${value == 2 ? "Rejected" : "approved"}`);
      }
    });
  };
  return (
    <ul class="list-group">
      <li class="list-group-item">
        {service.length > 0 ? (
          service.map((val) => (
            <div class="row py-2">
              <div class="col-md-6">
                <h5>{val?.ServiceId?.name}</h5>
                <h5 class="servicepro">{val.UserId?.name}</h5>
                <h6 class="info">
                  Date:{val.Date} Time: {val.Time} Price {val.Price} id:{" "}
                  {val._id.substr(1, 5)}
                </h6>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <button
                    type="button"
                    class="btn btn-outline-dark actionbtn"
                    onClick={() => updateBooking(val._id, 2)}
                  >
                    Cancel Booking
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-dark actionbtn"
                    onClick={() => updateBooking(val._id, 1)}
                  >
                    Approve Booking
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-dark actionbtn mt-3"
                    onClick={() =>
                      Swal.fire({
                        title: "Detail",
                        html: `
                        <div style="font-weight:bold">name:${val.UserId?.name}</div>
                        <div style="font-weight:bold">email:${val.UserId?.email}</div>
                          <div style="font-weight:bold">Price:${val.Price}</div>
                          <div style="font-weight:bold">Building:${val.Building}</div>
                          <div style="font-weight:bold">Address:${val.Address}</div>
                          <div style="font-weight:bold">City:${val.City}</div>
                          <div style="font-weight:bold">State:${val.State}</div>
                          <div style="font-weight:bold">Message:${val.Message}</div>
                          
                         
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

export default UpcomingS;
