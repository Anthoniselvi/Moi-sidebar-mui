import "./Home.css";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Nav from "./Nav";

function Dashboard(props) {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/new");
  };
  return (
    <>
      {/* <Nav /> */}
      <div className="home">
        {/* <div className="home-pic"></div> */}
        <div className="home-content">
        
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
        <Button variant="contained" onClick={navigateToSignUp} size="large" style={{ backgroundColor: "#03045e", color: "skyblue", fontWeight: "600"}}>
          Start
        </Button>
      </div>
    </Box>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
