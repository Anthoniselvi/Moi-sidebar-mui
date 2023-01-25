import React, { useState, useEffect } from "react";
// import "./EditProfile.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import "./Profile.css";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import AddProfile from "./AddProfile";
import { useUserAuth } from "../Context/UserAuthContext";

function Profile(props) {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [gender, setGender] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(true);
  const { user } = useUserAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setId(user.uid);
        setName(user.displayName);
        setEmail(user.email);
        // setMobile(user.mobile);
      } else {
        setId("");
        setName("");
      }
    });
  }, []);
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

          <div>
            <h3>Account Information</h3>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
          {profiles.id === user.uid && show ? (
            <div>
              <h3>Personal Information</h3>
              <p>Name: {profiles.name}</p>
              <p>Age: {profiles.age}</p>
              <p>Email: {profiles.gender}</p>
              <p>Address: {profiles.address}</p>
              <p>City: {profiles.city}</p>
              <p>Mobile Number: {profiles.mobile}</p>
              <p>Email: {profiles.email}</p>
            </div>
          ) : (
            <AddProfile />
          )}
        </div>
        {/* <AddProfile /> */}
        {/* {profiles.map((singleProfile, id) => ( */}
        {/* <div className="profile-table">
            <div className="editprofile-personalinfo">
              <h4>Personal Information</h4> */}

        {/* <table>
                <tr className="editprofile-tablerow">
                  <td>Name</td>
                  <td className="editprofile-answer">{props.name}</td>
                </tr>

                <tr className="editprofile-tablerow">
                  <td>Email</td>
                  <td className="editprofile-answer">
                    {email} */}
        {/* {singleProfile.email} */}
        {/* </td>
                </tr>
                <tr className="editprofile-tablerow">
                  <td>Phone</td>
                  <td className="editprofile-answer">
                    {mobile} */}
        {/* {singleProfile.mobile} */}
        {/* </td>
                </tr> */}
        {/* <tr className="editprofile-tablerow">
                  <td>Gender</td>
                  <td className="editprofile-answer"> */}
        {/* {singleProfile.gender} */}
        {/* </td>
                </tr>
                <tr className="editprofile-tablerow">
                  <td>City</td>
                  <td className="editprofile-answer"> */}
        {/* {singleProfile.city} */}
        {/* </td>
                </tr>
                <tr className="editprofile-tablerow">
                  <td>Username</td>
                  <td className="editprofile-answer"> */}
        {/* {singleProfile.username} */}
        {/* </td>
                </tr> */}
        {/* </table>
            </div>
          </div> */}
        {/* ))} */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Profile;
