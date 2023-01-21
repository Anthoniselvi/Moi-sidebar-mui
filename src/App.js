import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import AddNewEvent from "./pages/AddNewEvent";
import SignUp from "./pages/xxxxSignUp";
import SignIn from "./pages/SignIn";
import EventList from "./pages/EventList";
import EntryList from "./pages/EntryList";
import AddNewEntry from "./pages/AddNewEntry";
import EditEvent from "./pages/EditEvent";
import EditEntry from "./pages/EditEntry";
import Footer from "./pages/Footer";
import EntryTable from "./pages/EntryTable";
import MenuList from "./pages/MenuList";
import Form from "./pages/Form";
import NewSignUp from "./pages/NewSignup";
import Profile from "./pages/Profile";
// import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import Home from "./pages/Home";
import { auth } from "./pages/firebase";
import axios from "axios";

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

  // const getProfile = () => {
  //   axios.get("http://localhost:2023/profile").then((response) => {
  //     // console.log(response);
  //     console.log(response.data);
  //     setName(response.data.name);
  //   });
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);
  return (
    <div className="container">
      {/* <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="event/new" element={<AddNewEvent />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="eventslist" element={<EventList />} />
            <Route path="entry/new" element={<AddNewEntry />} />
            <Route path="entrylist" element={<EntryList />} />
            <Route path="event" element={<EditEvent />} />
            <Route path="edit" element={<EditEntry />} />
            <Route path="footer" element={<Footer />} />
            <Route path="table" element={<EntryTable />} />
            <Route path="form" element={<Form />} />
            <Route path="menu" element={<MenuList />} />
            <Route path="new" element={<NewSignUp />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Sidebar>
      </BrowserRouter> */}
      <BrowserRouter>
        <UserAuthContextProvider>
          <Sidebar>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    {/* <Home /> */}
                    <Dashboard name={name} />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<SignIn />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<NewSignUp />} />
              <Route path="eventslist" element={<EventList />} />
            </Routes>
          </Sidebar>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
