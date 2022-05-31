import { move } from "formik";
import React from "react";
import { Carousel } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/provideMain";
import bookingServices from "../../Services/services/booking";
import { urlImage } from "../../Services/url";
import classes from "./SingleService.module.css";
const SingleService = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  let { state: check } = useAuth();
  const [review, setReview] = React.useState([]);
  const [total, SetTotal] = React.useState();
  console.log(state);
  const move = () => {
    navigate("/Appointment", { state: { info: state.val } });
  };
  React.useEffect(() => {
    bookingServices.getReview(state.val._id).then((val) => {
      setReview(val.Reviews);
    });
  }, []);
  const average = () => {
    return (
      review.reduce((acc, cuurent) => acc + cuurent.rating, 0) / review.length
    );
  };
  const stars = (val) => {
    return (
      (review.reduce(
        (acc, cuurent) => (cuurent.rating == val ? (acc += 1) : (acc += 0)),
        0
      ) /
        review.length) *
        100 +
      "%"
    );
  };
  return (
    <div class={`py-5 ${classes.main}`}>
      <div class="container">
        <div class={`card ${classes.detailservicecard}`}>
          <div class="row hidden-md-up">
            <div class="col-md-6">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`${urlImage}${state?.val?.image}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div class="col-md-6">
              <h5 class={`card-title ${classes.head5}`}>{state?.val?.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {state?.val?.BussnesId?.name}
              </h6>
              <div class="card-body">
                <p class="card-text">{state?.val?.detail}</p>
                <div class={classes.cardbuttons}>
                  <p class="card-text">
                    {state?.val?.address || "Address not Provided"}
                  </p>{" "}
                  {/* <button
                    type="button"
                    class={`btn ${classes.detailservicebtn}`}
                  >
                    Book Now! (Calender Method)
                  </button> */}
                  {check.user?.role != "bussness" && (
                    <button
                      onClick={() => move()}
                      type="button"
                      class={`btn ${classes.detailservicebtn} `}
                    >
                      Book Now! (Manual Input)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" style={{ marginTop: "30px" }}>
          <div class="col-md-12">
            <div class={`card h-100 ${classes.reviewservicecard}`}>
              <h5
                class="card-title"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                Ratings & Review
              </h5>
              <hr />
              <div class="card-body">
                <div class="row g-0">
                  <div class="col-md-4 border-right">
                    <div class="ratings text-center p-4 py-5">
                      {" "}
                      <span class="badge bg-success">
                        {average() ? average() : 0} <i class="fa fa-star-o"></i>
                      </span>{" "}
                      <span class="d-block total-ratings">
                        {review.length} rating
                      </span>{" "}
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="rating-progress-bars p-3">
                      <div class="progress-1 align-items-center">
                        <div class="progress">
                          <span class="mx-2" style={{ fontWeight: "bold" }}>
                            5 Stars
                          </span>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: stars("5") != "NaN%" ? stars("5") : 0,
                            }}
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {" "}
                            {stars("5") != "NaN%" ? stars("5") : 0}
                          </div>
                        </div>
                        <div class="progress">
                          <span class="mx-2" style={{ fontWeight: "bold" }}>
                            4 Stars
                          </span>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: stars("4") != "NaN%" ? stars("4") : 0,
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {stars("4") != "NaN%" ? stars("4") : 0}
                          </div>
                        </div>
                        <div class="progress">
                          <span class="mx-2" style={{ fontWeight: "bold" }}>
                            3 Stars
                          </span>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: stars("3") != "NaN%" ? stars("3") : 0,
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {stars("3") != "NaN%" ? stars("3") : 0}
                          </div>
                        </div>
                        <div class="progress">
                          <span class="mx-2" style={{ fontWeight: "bold" }}>
                            2 Stars
                          </span>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: stars("2") != "NaN%" ? stars("2") : 0,
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {stars("2") != "NaN%" ? stars("2") : 0}
                          </div>
                        </div>
                        <div class="progress">
                          <span class="mx-2" style={{ fontWeight: "bold" }}>
                            1 Stars
                          </span>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: stars("1") != "NaN%" ? stars("1") : 0,
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {stars("1") != "NaN%" ? stars("1") : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-sm-7">
                    <div class="review-block">
                      {review.length > 0 ? (
                        review.map((val) => (
                          <>
                            <div class="row">
                              <div class="col-sm-3">
                                <h6>Customer</h6>
                              </div>
                              <div class="col-sm-9">
                                <div class="review-block-title">
                                  Stars:{val.rating}
                                </div>
                                <div class="review-block-description">
                                  {val.comment}
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        ))
                      ) : (
                        <h1>No Reviews</h1>
                      )}
                    </div>
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
