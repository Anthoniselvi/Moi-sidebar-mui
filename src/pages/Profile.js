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

  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2023/profile", {
        id: id,
        name: name,
        age: age,
        gender: gender,
        address: address,
        city: city,
        mobile: mobile,
        email: email,
      })
      .then((response) => {
        console.log(response);
        navigate(`/eventslist?id=${id}`);
      });
  };

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

        <div className="editprofile-image">
          <FaUserAlt className="profile-icon" />
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            readOnly
            onChange={(e) => setName(e.target.value)}
          />
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            readOnly
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
