import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function EditEvent() {
  const [eventType, setEventType] = useState();
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [date, setDate] = useState();
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:2023/events/", {
        id: eventId,
        eventType: eventType,
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log(response);
        // navigate("/eventslist");
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      setEventType(response.data.eventType);
      setName(response.data.name);
      setPlace(response.data.place);
      setDate(response.data.date);
    });
  }, []);

  const moveToFrontPage = () => {
    navigate("/eventslist");
  };

  return (
    <div className="addevent-container">
      <h1>Edit Event - {name}</h1>
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
            onChange={
              (e) => setEventType(e.target.value)
              // (e) => setImageSource(images[e.target.value]))
            }
          >
            <MenuItem value="wedding">Wedding</MenuItem>
            <MenuItem value="birthday">Birthday</MenuItem>
            <MenuItem value="baby">Baby Shower</MenuItem>
            <MenuItem value="others">Others</MenuItem>
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
        {/* <button
          type="submit"
          // onClick={handleSubmitEvent}
          className="addevent-button"
        >
          Edit
        </button> */}
        <Button variant="contained" type="submit">
          Edit
        </Button>
      </Box>
    </div>
  );
}
