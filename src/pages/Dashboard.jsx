import "./Home.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useUserAuth } from "../Context/UserAuthContext";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";
// import Nav from "./Nav";

function Dashboard(props) {
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState()
  // const [searchParam] = useSearchParams();
  // const profileId = searchParam.get("id");
  // const { logOut, user } = useUserAuth();
  const navigateToEventsList = () => {
    navigate(`/eventslist?id=${profileId}`);
  };

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getProfile = () => {
   
  };

  useEffect(() => {
    axios.get("http://localhost:2023/profile").then((response) => {
      // console.log(response);
      console.log(response.data);
      setProfileId(response.data.id)
      // setProfiles(response.data);
      // setAge(response.data.age);
      // setGender(response.data.gender);
      // setAddress(response.data.address);
      // setCity(response.data.city);
      // setMobile(response.data.mobile);
    });
  }, []);
  return (
    <div className="home">
       <Header />
      {/* <Nav /> */}
      {/* <div className="home"> */}
     
        {/* <div className="home-pic"></div> */}
        <div className="home-content">
          <div className="home-nav">
        {/* <h2>{props.name ? `Welcome ${props.name} !` : "Login Please"} </h2> */}
        <h2>{ `Welcome ${props.name} !` } </h2>
        {/* <Button
          variant="contained"
          onClick={handleLogout}
          size="medium"
          style={{
            // backgroundColor: "#03045e",
            // color: "skyblue",
            // fontWeight: "600",
            // width: "200px"
          }}
        >
          Log Out
        </Button>  */}
        </div>
        <h1>Moi Registry</h1>
        <p>
          Families are like branches on a tree. We grow in different directions
          yet our roots remain as one.
        </p>
        <p>
          "Time together as a family is a gift." - <b>Joanna Gaines</b>
        </p>
        {/* <button className="home-button" onClick={navigateToSignUp}>Start</button> */}
        <Box sx={{ '& button': { m: 1 } }} >
           <div>
        <Button variant="contained" onClick={navigateToEventsList} size="large" style={{ backgroundColor: "#03045e", color: "skyblue", fontWeight: "600"}}>
          Start
        </Button>
      </div>
    </Box>
        </div>
      </div>
    // </div>
  );
}

export default Dashboard;


