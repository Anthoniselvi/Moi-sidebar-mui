import React, { useState, useEffect } from "react";
// import "./EditProfile.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [profiles, setProfiles] = useState([]);

  const getProfile = () => {
    axios.get("http://localhost:2023/profile").then((response) => {
      // console.log(response);
      console.log(response.data);
      setProfiles(response.data);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container">
      <div className="editprofile-container">
        <h1>Profile</h1>

        <div className="editprofile-body">
          <div className="editprofile-image">
            <FaUserAlt className="profile-icon" />
          </div>

          {profiles.map((singleProfile, id) => (
            <div className="profile-table">
              <div className="editprofile-personalinfo">
                <h4>Personal Information</h4>

                <table>
                  <tr className="editprofile-tablerow">
                    <td>Name</td>
                    <td className="editprofile-answer">{singleProfile.name}</td>
                  </tr>

                  <tr className="editprofile-tablerow">
                    <td>Email</td>
                    <td className="editprofile-answer">
                      {singleProfile.email}
                    </td>
                  </tr>
                  <tr className="editprofile-tablerow">
                    <td>Phone</td>
                    <td className="editprofile-answer">
                      {singleProfile.mobile}
                    </td>
                  </tr>
                  <tr className="editprofile-tablerow">
                    <td>Gender</td>
                    <td className="editprofile-answer">
                      {singleProfile.gender}
                    </td>
                  </tr>
                  <tr className="editprofile-tablerow">
                    <td>City</td>
                    <td className="editprofile-answer">{singleProfile.city}</td>
                  </tr>
                  <tr className="editprofile-tablerow">
                    <td>Username</td>
                    <td className="editprofile-answer">
                      {singleProfile.username}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
