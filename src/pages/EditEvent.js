import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";

export default function EditEvent() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  //   const [date, setDate] = useState("");
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:2023/events/", {
        id: parseInt(eventId),
        name: name,
        place: place,
        date: eventDate,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      setName(response.data.name);
      setPlace(response.data.place);
      // setEventDate(response.data.date);
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
          label="Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
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
