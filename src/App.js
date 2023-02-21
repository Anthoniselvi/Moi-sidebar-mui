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

import NewSignUp from "./pages/NewSignup";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Home from "./pages/Home";
import { auth } from "./pages/firebase";
import axios from "axios";
import Header from "./pages/Header";

import DemoBar from "./pages/DemoBar";
import DemoPie from "./pages/DemoPie";
import Entries from "./pages/Entries";

import NewPdf from "./pages/NewPdf";

import Fileupload from "./pages/FileUpload";
import SimpleSlider from "./pages/SimpleSlider";

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
            {/* <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard name={name} />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/" element={<SimpleSlider />} />
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

            <Route path="profile" element={<Profile name={name} />} />

            <Route path="demobar" element={<DemoBar />} />
            <Route path="demopie" element={<DemoPie />} />
            <Route path="entries" element={<Entries />} />
            <Route path="pdf" element={<NewPdf />} />

            <Route path="upload" element={<Fileupload />} />
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
