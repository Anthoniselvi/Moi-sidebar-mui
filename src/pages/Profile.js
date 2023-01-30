import React, { useState, useEffect } from "react";
// import "./EditProfile.css";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import "./Profile.css";
import { auth } from "./firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddProfile from "./AddProfile";
import { useUserAuth } from "../Context/UserAuthContext";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");

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
    // axios

    //   .put("http://localhost:2023/events/", {
    //     id: id,
    //     age: age,
    //     gender: gender,
    //     address: address,
    //     city: city,
    //     mobile: mobile,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     navigate(`/eventslist?id=${id}`);
    //   });
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
  useEffect(() => {
    axios.get(`http://localhost:2023/profile/${id}`).then((response) => {
      console.log(response);
      setAge(response.data.age);
      setGender(response.data.gender);
      setAddress(response.data.address);
      setCity(response.data.city);
      setMobile(response.data.mobile);
      // navigate(`/eventslist?id=${id}`);
    });
  });
  // const getProfile = () => {
  //   axios.get(`http://localhost:2023/profile/${profileId}`).then((response) => {
  //     // console.log(response);
  //     console.log(response.data);
  //     // setProfiles(response.data);
  //     setAge(response.data.age);
  //     setGender(response.data.gender);
  //     setAddress(response.data.address);
  //     setCity(response.data.city);
  //     setMobile(response.data.mobile);
  //   });
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <div className="editprofile-container">
      <h1>Profile</h1>

      <div className="editprofile-image">
        <FaUserAlt className="profile-icon" />
      </div>

      {/* <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            readOnly
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>Age</label>

          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="profile-row">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            readOnly
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        className="profile-form"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          readOnly
          onChange={(e) => setName(e.target.value)}
          // error={errors.email}
        />
        {/* {errors.email && <p className="error">{errors.email}</p>} */}
        {/* /> */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          type="age"
          id="age"
          autoComplete="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          // error={errors.password}
        />
        {/* {errors.password && <p className="error">{errors.password}</p>} */}
        {/* /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          autoFocus
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="mobile"
          label="Mobile Number"
          name="mobile"
          autoComplete="mobile"
          autoFocus
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          // error={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          readOnly
          onChange={(e) => setEmail(e.target.value)}
          // error={errors.email}
        />
        <Button
          // onClick={navigateToEventList}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </div>
  );
}

export default Profile;
