import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     border: "1px solid red",
//   },
// }));
export default function AddNewEvent() {
  // const classes = useStyles();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2023/events", {
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
    setName("");
    setPlace("");
    setDate("");
  };

  const navigateToAddNewEvent = () => {
    navigate("/event/new");
  };

  const moveToFrontPage = () => {
    navigate("/eventslist");
  };

  return (
    <div className="addevent-container">
      <h1>Add New Event</h1>
      {/* <form onSubmit={handleSubmitEvent}> */}
      <Box
        onSubmit={handleSubmitEvent}
        className="addevent-form"
        component="form"
        // sx={{
        //   "& > :not(style)": { m: 1, width: "50ch" },
        // }}
        noValidate
        autoComplete="off"
      >
        <TextField
          // id="outlined-error-helper-text"
          // label="Error"
          // helperText="Incorrect entry."
          id="outlined-name"
          label="Event Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{ width: "300px" }}
          // className={classes.textField}
        />
        <TextField
          id="outlined-place"
          label="Event Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          sx={{ width: "300px" }}
        />
        <TextField
          id="outlined-date"
          // label="Event Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}
