import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReactImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useAuth } from "../../../Services/provideMain";
import bookingServices from "../../../Services/services/booking";
import ImageUploading from "react-images-uploading";
import bussnessServices from "../../../Services/services/bussnessuser";
const Pending = () => {
  const [service, setServices] = React.useState([]);
  const [serviceP, setServicesP] = React.useState([]);
  const { state, refresh, refetch } = useAuth();

  React.useEffect(() => {
    bookingServices.getBooking(state.user._id).then((val) => {
      setServices(val.Booking.filter((val) => val.status == 0));
      setServicesP(val.Booking.filter((val) => val.status == 1));
    });
  }, [refresh]);
  const updateBooking = async (id) => {
    Swal.fire({
      title: "Are You Sure You want to cancel it",
      showDenyButton: true,

      confirmButtonText: "Yes",
    }).then(async (s) => {
      if (s.isConfirmed) {
        await bookingServices.updatebooking(id, { status: "3" });
        setServices(service.filter((val) => val._id != id));
        refetch();
        Swal.fire("Booking canceled");
      } else {
        Swal.fire("Booking Not Cancel");
      }
    });
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const updateBookings = async (id) => {
    Swal.fire({
      title: "Are You Sure You want to cancel it",
      showDenyButton: true,

      confirmButtonText: "Yes",
    }).then(async (s) => {
      if (s.isConfirmed) {
        await bookingServices.updatebooking(id, {
          status: "3",
          canceledBy: "Client",
        });
        setServicesP(serviceP.filter((val) => val._id != id));
        refetch();
        Swal.fire("Booking canceled");
      } else {
        Swal.fire("Booking not canceled");
      }
    });
  };
  const uploads = async (id) => {
    const formData = new FormData();

    formData.append("payment", images[0].file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await bookingServices
      .updateBookingPayment(formData, id, config)
      .then((val) => {
        refetch();
      });
  };
  return (
    <Tabs
      defaultActiveKey="Requested"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Requested" title="Requested">
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
                      <button
                        type="button"
                        class="btn btn-outline-dark actionbtn"
                        onClick={() => updateBookings(val._id)}
                      >
                        Cancel Request
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-dark actionbtn"
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
      </Tab>
      <Tab eventKey="Payment" title="Payment Pending">
        <ul class="list-group">
          <li class="list-group-item">
            {serviceP.length > 0 ? (
              serviceP.map((val) => (
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
                      <button
                        type="button"
                        class="btn btn-outline-dark actionbtn"
                        onClick={() => updateBooking(val._id)}
                      >
                        Cancel Request
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-dark actionbtn "
                        onClick={() =>
                          Swal.fire({
                            title: "Payment Gudiness",
                            html: `<h2>Please pay bill at given number</h2>
                          <div style="font-weight:bold">Payment Number:${val.OwnerId.phoneNo}</div>
                          <div style="font-weight:bold">Price:${val.Price}</div>
                          <div style="font-weight:bold">Email:${val.OwnerId.email}</div>
                       
                          
                         
                      `,

                            confirmButtonText: "Ok",
                          })
                        }
                      >
                        Payment Guidness
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
                      {val.PaymentStatus == 0 ? (
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
                            <div className="upload__image-wrapper text-center">
                              <button
                                type="button"
                                class="btn btn-outline-dark actionbtn mt-3"
                                style={
                                  isDragging ? { color: "red" } : undefined
                                }
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                Upload Screenshot
                              </button>
                              &nbsp;
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
                                      onClick={() => uploads(val._id)}
                                      type="button"
                                    >
                                      Submit
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
                      ) : (
                        <div class="text-center fw-bold">
                          Payment Screenshot uploaded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No Booking</h1>
            )}
          </li>
        </ul>
      </Tab>
    </Tabs>
  );
};

export default Pending;
