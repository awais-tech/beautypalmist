import React from "react";
import classes from "./Home.module.css";

import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  let Client = (name) => {
    navigate(name);
  };
  return (
    <>
      <div class=" mb-2" id="Home">
        <div
          id="carouselExampleCaptions"
          class="carousel-fade carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="4000">
              <img
                src="https://static.wixstatic.com/media/nsplsh_ec163b8588f6459ebbe1d10fb1ca9641~mv2.jpg/v1/fill/w_1349,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/nsplsh_ec163b8588f6459ebbe1d10fb1ca9641~mv2.jpg"
                class="d-block w-100 h-100"
                alt="homeslide"
              />
              <div class="carousel-caption">
                <h1>
                  Explore our Services
                </h1>

                <p class="">
                  View{" "}
                </p>
              </div>
            </div>
            <div class="carousel-item" data-interval="4000">
              <img
                src="https://static.wixstatic.com/media/11c705_1268f765f0794e6b90a2d24b559b5c2b~mv2.jpg/v1/fill/w_1200,h_578,al_c,q_85,enc_auto/11c705_1268f765f0794e6b90a2d24b559b5c2b~mv2.jpg"
                class="d-block w-100 h-100"
                alt="..."
              />
              <div class="carousel-caption  d-md-block  ">
                <h2 class="headh2" rounded>
                  Salons
                </h2>

                <div class="red  subhead rounded">
                  Learn More{" "}
                </div>
              </div>
            </div>
            <div class="carousel-item" data-interval="4000">
              <img
                src="https://static.wixstatic.com/media/11062b_7baad12566c547d3bcd4f45b895e589e~mv2.jpg/v1/fill/w_1349,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7baad12566c547d3bcd4f45b895e589e~mv2.jpg"
                class="d-block w-100 h-100"
                alt="..."
              />
              <div class="carousel-caption  d-md-block">
                <h2 class="headh2" rounded>
                  Aesthetics
                </h2>

                <div class="red subhead rounded">
                  Learn More
                </div>
              </div>
            </div>

            <div class="carousel-item" data-interval="4000">
              <img
                src="https://static.wixstatic.com/media/11062b_2d254ff732c24a3bb782ef6801ecd13f~mv2.jpg/v1/fill/w_1349,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_2d254ff732c24a3bb782ef6801ecd13f~mv2.jpg"
                class="d-block w-100 h-100"
                alt="..."
              />
              <div class="carousel-caption  d-md-block">
                <h2 class="headh2" rounded>
                  Fitness
                </h2>

                <div class="red subhead rounded">
                  Learn More
                </div>
              </div>
            </div>

            <div class="carousel-item" data-interval="4000">
              <img
                src="https://static.wixstatic.com/media/e476b6b2b0fd432ca460e0b16067b6ed.jpg/v1/fill/w_1348,h_650,al_c,q_85,enc_auto/e476b6b2b0fd432ca460e0b16067b6ed.jpg"
                class="d-block w-100 h-100"
                alt="..."
              />
              <div class="carousel-caption  d-md-block">
                <h2 class="headh2" rounded>
                  Photography
                </h2>

                <div class="red subhead rounded">
                  Learn More
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="container-fluid about ">
         <div class="container-fluid">
            <div class="row">
       
               <div class="col-md-12 pt-5">
               <h1 class="text-center ">About Us</h1>
               <p class="text-center font-weight-normal text-muted pt-2">Choose from a variety of categories from Personal Care to Fitness Your beauty answers are just a few questions away!</p>
                 
               </div>
            </div>
         </div>
         </div>
      <div class="container-fluid about pb-5">
         <div class="container-fluid">
            <div class="row">
               <div class="col-2"></div>
               <div class="col-md-8 col-12">
                 
               </div>
               <div class="col-2"></div>
               
            </div>
            <div class="row">
               <div class="col-2"></div>
               <div class="col-md-8 col-12">
                 
               </div>
               <h2 class="text-left">Our Team</h2>
               <div class="col-2"></div>
            </div>

            <div class="row mt-5">
               <div class="col-xl-4 col-md-6 pt-2">
                  <div class="d-flex justify-content-center">
                     <div class="card shadow-lg">
                        <div class="card-images text-center">
                           <img src="person 1.jpg " class="card-img-top rounded-circle cards-img" alt="..."/>
                        </div>
                        <div class="card-body">
                           <h5 class="card-title text-center font-weight-bolder">Name</h5>
                           <h6 class="text-center font-weight-normal text-muted">Designer</h6>
                           <p class="card-text text-center font-weight-normal text-dark p-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                          
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-md-6 pt-2">
                  <div class="d-flex justify-content-center">
                     <div class="card shadow-lg" >
                        <div class="card-images text-center">
                           <img src="person 2.jpg" class="card-img-top rounded-circle cards-img" alt="..."/>
                        </div>
                        <div class="card-body">
                           <h5 class="card-title text-center font-weight-bolder">Name</h5>
                           <h6 class="text-center font-weight-normal text-muted">Developer</h6>
                           <p class="card-text text-center font-weight-normal text-dark p-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                           
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-4 col-md-6 pt-2">
                  <div class="d-flex justify-content-center">
                     <div class="card shadow-lg" >
                        <div class="card-images text-center">
                           <img src="person 3.jpg " class="card-img-top rounded-circle cards-img" alt="..."/>
                        </div>
                        <div class="card-body">
                           <h5 class="card-title text-center font-weight-bolder">Name</h5>
                           <h6 class="text-center font-weight-normal text-muted">Beauty Expert</h6>
                           <p class="card-text text-center font-weight-normal text-dark p-3">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                         
                        </div>
                     </div>
                  </div>
               </div>
            
            </div>
         </div>
      </div>
      <div className={classes.main} style={{ backgroundColor: "blue" }}>
        <div class="container">
          <div class="row" id="Services">
            <div class="col-md-12 text-center  py-4">
              <h2 class="heading  fadeLeft fw-bold fs-2" data-t-show="0">
                Our Services
              </h2>
              <div className="text-muted">
                Best Online Booking for Beauty care
              </div>
            </div>
            <div class="col-md-4  text-center flipY  ">
              <div
                class="card shadow p-3 mb-5 bg-white rounded pb-5 ho"
                data-t-show="1"
              >
                <div class="card-body">
                  <div class="card-img-top">
                    <img
                      className="w-100"
                      src="https://static.wixstatic.com/media/11c705_d25335dd907d40e295d469d81fdcb2f3~mv2.jpg/v1/crop/x_99,y_0,w_802,h_1000/fill/w_467,h_584,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/jjjjj.jpg"
                      alt=""
                    />
                  </div>
                  <button
                    onClick={() => {
                      Client("/Palmist");
                    }}
                    class={`btn btn-primary ${classes[`login-btn`]}`}
                  >
                    View
                  </button>
                  <h2 class={`card-title ${classes.head1}`}>The Palmist</h2>
                  <p class="card-text text-muted py-1">
                    Your beauty answers are just a few questions away!
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 text-center flipY" data-t-show="2">
              <div class="card shadow p-4 mb-5 bg-white rounded ho">
                <div class="card-body">
                  <div class="card-img-top">
                    <img
                      className="w-100"
                      src="https://static.wixstatic.com/media/11c705_520eb9c867924167a04ffa8d4987935a~mv2.jpg/v1/crop/x_102,y_0,w_796,h_993/fill/w_467,h_584,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/home-cleaning-gardening-decorating-services-logo-vector-28974187_edited.jpg"
                      alt=""
                    />
                  </div>
                  <button
                    onClick={() => Client("/Services")}
                    class={`btn btn-primary ${classes[`login-btn`]}`}
                  >
                    View
                  </button>
                  <h2 class={`card-title ${classes.head1} py-4`}>
                    Our Services
                  </h2>
                  <p class="card-text text-muted py-2">
                    Choose from a variety of categories from Personal Care to
                    Fitness
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4  text-center flipY" data-t-show="3">
              <div class="card shadow p-3 mb-5 bg-white rounded ho">
                <div class="card-body">
                  <div class="card-img-top">
                    <img
                      className="w-100"
                      src="https://static.wixstatic.com/media/11c705_aa437f551aea450fbeeae621e4bc818b~mv2.jpg/v1/crop/x_61,y_0,w_491,h_612/fill/w_467,h_584,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/istockphoto-1127729949-612x612.jpg"
                      alt=""
                    />
                  </div>
                  <button
                    type="submit"
                    class={`btn btn-primary ${classes[`login-btn`]}`}
                  >
                    View
                  </button>
                  <h2 class={`card-title ${classes.head1} py-2`}>Trending</h2>
                  <p class="card-text text-muted py-2">
                    View Latest trends and offers and don't miss on amazing
                    deals!!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="container-fluid contact">
        <div class="container contact">
          <div class="row">
            <div class="col-md-5 text-center mt-5">
              <h6 class="colo">Why choose beautyPalmist</h6>
              <p class="colo">
                We Provide best services in the world.We have all range of
                services available
              </p>
              <br />
              <p class="colo font-weight-bold">
                Any difficulties Give me a call to learn more about it.
              </p>
              <br />
              <h6 class="colo">
                <button className="btn btn-dark" href="mailto:">Email Us</button>
              </h6>
              <h6 class="colo">Office: (0332)-xxxxxxx</h6>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-6">
              <div class="colo text-center font-weight-bolder">
                Contact Form
              </div>
              <form class="form-b">
                <input
                  type="text"
                  placeholder="Your Name"
                  class="inp"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  class="inp"
                  required
                />
                <input type="text" placeholder="Subject" class="inp" required />
                <textarea
                  className="inp"
                  name="Message"
                  rows="5"
                  placeholder="Message"
                ></textarea>
                <div class="row">
                  <div class="col-3">
                    <input
                      type="submit"
                      value="Send"
                      class="btn btn-dark btn-md"
                    />
                  </div>
                </div>
                <div class="col-9"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
