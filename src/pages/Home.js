// import React from "react";
// // import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router";
// import { useUserAuth } from "../Context/UserAuthContext";
// import Button from "@mui/material/Button";

// const Home = () => {
//   const { logOut, user } = useUserAuth();
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <>
//       <div className="p-4 box mt-3 text-center">
//         Hello Welcome <br />c
//       </div>
//       <div className="d-grid gap-2">
//         <Button
//           variant="contained"
//           onClick={handleLogout}
//           size="large"
//           style={{
//             backgroundColor: "#03045e",
//             color: "skyblue",
//             fontWeight: "600",
//           }}
//         >
//           Log Out
//         </Button>
//         {/* <Button variant="primary" onClick={handleLogout}>
//           Log out
//         </Button> */}
//       </div>
//     </>
//   );
// };

// export default Home;

import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  const navigateToDashBoard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="home_container">
      <h1 style={{ textAlign: "center", color: "#FFFFFF" }}>
        Moi Application / மொய் வரவு
      </h1>
      <p style={{ textAlign: "center", color: "#FFFFFF" }}>
        This application is used to enter MOI doing at all our family functions
      </p>
      <Button
        onClick={navigateToDashBoard}
        style={{
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          color: "#9C27B0",
        }}
      >
        Enter
      </Button>
    </div>
  );
}
