import "./Home.css";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import { useUserAuth } from "../Context/UserAuthContext";
import Header from "./Header";
// import Nav from "./Nav";

function Dashboard(props) {
  const navigate = useNavigate();
  // const { logOut, user } = useUserAuth();
  const navigateToEventsList = () => {
    navigate("/eventslist");
  };

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
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


