import { Tab, Tabs } from "react-bootstrap";
import Canceled from "../../Components/Header/Booking/Canceled";
import History from "../../Components/Header/Booking/History";
import Pending from "../../Components/Header/Booking/Pending";
import Rejected from "../../Components/Header/Booking/Rejected";
import Upcoming from "../../Components/Header/Booking/Upcoming";
import "./myBooking.css";
import UserProfile from "./Profile/Profile";
const MyBooking = () => {
  return (
    <>
      <div class="py-5 mainbookings">
        <div class="card booktopcard">
          <Tabs
            defaultActiveKey="MyBookings"
            id="uncontrolled-tab-example"
            className="mb-5"
          >
            <Tab eventKey="MyBookings" title="My Bookings">
              <div class="card p-3">
                <h5 class="card-title">Manage Your Bookings</h5>
                <h6 class="card-subtitile py-4">
                  View, reschedule & cancel your bookings and easily book again.
                  <br />
                </h6>
                <Tabs
                  defaultActiveKey="upcoming"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="upcoming" title="Confirmed Bookings">
                    <Upcoming />
                  </Tab>
                  <Tab eventKey="history" title="History">
                    <History />
                  </Tab>
                  <Tab eventKey="pending" title="Bookings Requests">
                    <Pending />
                  </Tab>
                  <Tab eventKey="rejected" title="Rejected">
                    <Rejected />
                  </Tab>
                  <Tab eventKey="cancelled" title="Cancelled">
                    <Canceled />
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="Accounts" title="Accounts">
              <UserProfile />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default MyBooking;
