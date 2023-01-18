import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import AddNewEvent from "./pages/AddNewEvent";
import SignUp from "./pages/SignUp";
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

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
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
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
};

export default App;
