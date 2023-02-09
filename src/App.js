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
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
