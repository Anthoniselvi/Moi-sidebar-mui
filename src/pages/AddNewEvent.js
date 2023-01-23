import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     border: "1px solid red",
//   },
// }));
export default function AddNewEvent() {
  // const classes = useStyles();
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2023/events", {
        eventType: eventType,
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
    setEventType("");
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={eventType}
            label="Event Type"
            onChange={(e) => setEventType(e.target.value)}
          >
            <MenuItem value={eventType === "wedding"}>Wedding</MenuItem>
            <MenuItem value={eventType === "birthday"}>Birthday</MenuItem>
            <MenuItem value={eventType === "baby"}>Baby Shower</MenuItem>
            <MenuItem value={eventType === "others"}>Others</MenuItem>
          </Select>
        </FormControl>
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
        {/* <DatePicker
          aria-required={"true"}
          className="m-2"
          format="DD-MM-YYYY"
          onChange={(value) => {
            setDate(moment(value).format("DD-MM-YYYY"));
          }}
        /> */}
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}
