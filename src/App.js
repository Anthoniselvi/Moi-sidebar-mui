import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import AddNewEvent from "./pages/AddNewEvent";
// import SignUp from "./pages/xxxxSignUp";
import SignIn from "./pages/SignIn";
import EventList from "./pages/EventList";
import EntryList from "./pages/EntryList";
import AddNewEntry from "./pages/AddNewEntry";
import EditEvent from "./pages/EditEvent";
import EditEntry from "./pages/EditEntry";
import Footer from "./pages/Footer";
import EntryTable from "./pages/EntryTable";
import MenuList from "./pages/MenuList";
// import Form from "./pages/Form";
import NewSignUp from "./pages/NewSignup";
import Profile from "./pages/Profile";
// import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Home from "./pages/Home";
import { auth } from "./pages/firebase";
import axios from "axios";
import Header from "./pages/Header";
import AddProfile from "./pages/AddProfile";
import Image from "./pages/Image";
// import Chart from "./pages/EventChart";
// import NewChart from "./pages/NewChart";
import ChartOutput from "./pages/ChartOutput";
// import BarChart from "./pages/BarChart";
import CardContainer from "./pages/CardContainer";
import DemoBar from "./pages/DemoBar";
import DemoPie from "./pages/DemoPie";
import Entries from "./pages/Entries";
import PdfDownload from "./pages/PdfDownload";
import NewPdf from "./pages/NewPdf";
import Banner from "./pages/Banner";
import DialogConfirmation from "./pages/DialogConfirmation";
// import CarouselPage from "./pages/CarouselPage";

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setName(user.displayName);
      } else setName("");
    });
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {/* <Home /> */}
                  <Dashboard name={name} />
                </ProtectedRoute>
              }
            />
            <Route
              path="header"
              element={
                <ProtectedRoute>
                  <Header name={name} />
                </ProtectedRoute>
              }
            />
            <Route path="dashboard" element={<Dashboard name={name} />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<NewSignUp />} />
            <Route
              path="eventslist"
              element={
                <ProtectedRoute>
                  <EventList name={name} />
                </ProtectedRoute>
              }
            />
            <Route path="event/new" element={<AddNewEvent />} />
            <Route path="entry/new" element={<AddNewEntry />} />
            <Route path="entrylist" element={<EntryList />} />
            <Route path="editevent" element={<EditEvent />} />
            <Route path="editentry" element={<EditEntry />} />
            <Route path="footer" element={<Footer />} />
            <Route path="table" element={<EntryTable />} />
            {/* <Route path="form" element={<Form />} /> */}
            <Route path="menu" element={<MenuList />} />
            <Route path="addprofile" element={<AddProfile />} />
            <Route path="profile" element={<Profile name={name} />} />
            <Route path="image" element={<Image />} />
            {/* <Route path="chart" element={<Chart />} /> */}
            {/* <Route path="newchart" element={<NewChart />} /> */}
            {/* <Route path="barchart" element={<BarChart />} /> */}
            <Route path="chart" element={<ChartOutput />} />
            <Route path="card" element={<CardContainer />} />
            <Route path="demobar" element={<DemoBar />} />
            <Route path="demopie" element={<DemoPie />} />
            <Route path="entries" element={<Entries />} />
            <Route path="pdf" element={<NewPdf />} />
            <Route path="banner" element={<Banner />} />
            {/* <Route path="carousel" element={<CarouselPage />} /> */}
            <Route path="dialogconfirmation" element={<DialogConfirmation />} />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
// import React from "react";
// import Carousel from "./pages/Carousel";
// import wedding from "./images/wedding.jpg";
// import birthday from "./images/birthday.jpg";

// function App() {
//   const items = [wedding, birthday, "Item 3", "Item 4", "Item 5"];
//   const itemWidth = 60;

//   return (
//     <div className="App">
//       <Carousel items={items} itemWidth={itemWidth} />
//     </div>
//   );
// }
// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import CarouselList from "./newpages/CarouselList";
// import Data from "./newpages/Data";
// import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// export default function App() {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const [slideDirection, setSlideDirection] = useState("Right");
//   useEffect(() => {
//     let current = activeSlide;
//     let direction = slideDirection;
//     const autoPlay = () => {
//       if (current === Data.length - 1) {
//         current -= 1;
//         setActiveSlide(current);
//         setSlideDirection("Left");
//       } else if (current === 0) {
//         current += 1;
//         setActiveSlide(current);
//         setSlideDirection("Right");
//       } else if (current > 0 && direction === "Right") {
//         current += 1;
//         setActiveSlide(current);
//       } else if (current < Data.length - 1 && direction === "Left") {
//         current -= 1;
//         setActiveSlide(current);
//       }
//     };
//     const timerId = setInterval(() => {
//       autoPlay();
//     }, 5000);
//     return () => clearInterval(timerId);
//   }, [activeSlide, slideDirection]);

//   const moveLeft = (slideIndex) => {
//     setActiveSlide(slideIndex - 1);
//     setSlideDirection("Left");
//   };
//   const moveRight = (slideIndex) => {
//     setActiveSlide(slideIndex + 1);
//     setSlideDirection("Right");
//   };
//   return (
//     <div className="app">
//       <h1 className="main-head">Moi Application</h1>
//       <div className="slideshow-container">
//         <CarouselList activeSlide={activeSlide} />
//         <BsArrowLeft
//           className={activeSlide === 0 ? "display prev" : "prev"}
//           onClick={() => moveLeft(activeSlide)}
//         />
//         <BsArrowRight
//           className={activeSlide === Data.length - 1 ? "display next" : "next"}
//           onClick={() => moveRight(activeSlide)}
//         />
//       </div>
//     </div>
//   );
// }
