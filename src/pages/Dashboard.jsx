// import "./Home.css";
import "./style.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useUserAuth } from "../Context/UserAuthContext";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";
import { useUserAuth } from "../Context/UserAuthContext";

function Dashboard(props) {
  const navigate = useNavigate();
const [profileId, setProfileId] = useState()
  // const [searchParam] = useSearchParams();
  // const profileId = searchParam.get("profile");
  const { logOut, user } = useUserAuth();

  const navigateToEventsList = () => {
    if(user) {
       navigate(`/eventslist?profile=${profileId}`)
    }  else {
   alert("Kindly do login")
  }
  };
  useEffect(() => {
    axios.get(`http://localhost:2010/profile/${profileId}`).then((response) => {
      // console.log(response);
      console.log("get profile : " + JSON.stringify(response.data));
      setProfileId(response.data.profileId);
    });
  }, []);


  return (
    <div className="dashboard_container">
    <Header />
      {/* <div className="home"> */}
     
        <div className="dashboard_body">
 
        {/* <h2>{props.name ? `Welcome ${props.name} !` : "Login Please"} </h2> */}
        {/* <h2>{ `Welcome ${props.name} !` } </h2> */}
   <div className="dashboard_content">
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
        
              <Button variant="contained" onClick={navigateToEventsList} size="large" style={{ backgroundColor: "#03045e", color: "skyblue", fontWeight: "600"}}>
                Start
              </Button>
   

    </Box>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


