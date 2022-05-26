import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../Services/provideMain";
import bussnessServices from "../../../Services/services/bussnessuser";
import { success } from "../../../utilties/Messagehandler";
import "./UserProfile.css";
const UserProfile = () => {
  let { state, updateUser } = useAuth();
  const [profile, setProfile] = React.useState({
    name: state.user.name,
    email: state.user.email,
    phoneNo: state.user.phoneNo,
  });
  console.log(state);
  const profileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const submits = () => {
    bussnessServices.updateUser(profile).then((val) => {
      updateUser(profile);
      success("Profile is updated");
    });
  };
  return (
    <div class="py-5 ">
      <div class="card toppings">Profile Update</div>
      <h4>Account</h4>
      <h5 class="mb-2">View and Edit Your Profile</h5>
      <hr />
      <div class="card sd">
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-6">
                <label for="exampleInputEmail1" class="bold form-label">
                  Name
                </label>
                <input
                  type="name"
                  value={profile.name}
                  class="form-control "
                  id="Name"
                  name="name"
                  placeholder="Name"
                  onChange={profileUpdate}
                />
              </div>

              <div class="col-md-6">
                <label for="exampleInputEmail1" class="bold form-label">
                  Phone no
                </label>
                <input
                  type="number"
                  class="form-control "
                  id="emailId"
                  name="phoneNo"
                  value={profile.phoneNo}
                  aria-describedby="emailHelp"
                  placeholder="Phoneno"
                  onChange={profileUpdate}
                />
              </div>
              <div class="col-md-6">
                <label for="exampleInputEmail1" class="bold form-label">
                  Email
                </label>

                <input
                  type="email"
                  readOnly
                  name="email"
                  value={profile.email}
                  class="form-control "
                  id="emailId"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={profileUpdate}
                />
              </div>
            </div>

            <div class="btnupdate mt-4  text-end">
              <button
                type="button"
                class="btn btn-lg btn-dark"
                onClick={() => {
                  submits();
                }}
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
