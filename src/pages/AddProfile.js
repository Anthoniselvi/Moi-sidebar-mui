import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "./firebase";

export default function AddProfile() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setId(user.uid);
        // setMobile(user.mobile);
      } else setId("");
    });
  }, []);
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
        // username: username,
        // password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
    // setEventType("");
    // setName("");
    // setPlace("");
    // setDate("");
  };

  //   useEffect(() => {
  //     handleSubmit();
  //   }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {gender}</p>
        <p>Address: {address}</p>
        <p>City: {city}</p>
        <p>Mobile Number: {mobile}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}
