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
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.css";
export default function EditEvent() {
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [date, setDate] = useState();
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  // const profileId = searchParam.get("profile");
  // console.log("editEvent recd eventId : " + eventId);
  // console.log("editEvent recd profileId : " + profileId);

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    console.log("update button clicked");
    axios
      .put("http://localhost:2010/events/", {
        eventId: eventId,
        eventType: eventType,
        name: name,
        place: place,
        date: date,
      })
      .then((response) => {
        console.log("Edit event-getting response: " + JSON.stringify(response));
        axios
          .get(`http://localhost:2010/events/profileId/${eventId}`)
          .then((response) => {
            console.log(
              "getting profileId from event :" + JSON.stringify(response)
            );

            navigate(`/eventslist?profile=${response.data.profileId}`);
          });
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:2010/events/${eventId}`).then((response) => {
      console.log("Edit Event of selected event: " + JSON.stringify(response));
      console.log("Edit event data : " + JSON.stringify(response.data));
      setEventType(response.data.eventType);
      setName(response.data.name);
      setPlace(response.data.place);
      setDate(response.data.date);
    });
  }, []);

  const navigateToEventslist = () => {
    axios
      .get(`http://localhost:2010/events/profileId/${eventId}`)
      // .get(`http://localhost:2023/events/profileId?eventId=${eventId}`)
      .then((response) => {
        // console.log(id);
        console.log("getting profileId from event" + JSON.stringify(response));
        console.log(response.data);
        // setEntries(response.data);
        navigate(`/eventslist?profile=${response.data.profileId}`);
      });
  };
  // console.log("eventType before return :" + eventType);
  return (
    <div className="editevent_container">
      {/* <h1>Edit Event - {name}</h1> */}
      <div className="editevent_header">
        <ArrowBackIcon onClick={navigateToEventslist} />

        <h2>Update Event</h2>
      </div>
      <Box
        onSubmit={handleUpdateEvent}
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
          {/* {console.log("eventType inside return :" + eventType)} */}
          <Select
            sx={{ width: "300px", marginBottom: "5%" }}
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
          sx={{ width: "300px", marginBottom: "5%" }}
          // className={classes.textField}
        />
        <TextField
          id="outlined-place"
          label="Event Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          sx={{ width: "300px", marginBottom: "5%" }}
        />
        <TextField
          id="outlined-date"
          // label="Event Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: "300px", marginBottom: "5%" }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#9C27B0" }}
          type="submit"
        >
          Update
        </Button>
      </Box>
      {/* <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon">
        <Fab color="primary" aria-label="add">
          <ArrowBackIcon onClick={navigateToEventslist} />
        </Fab>
      </Box> */}
    </div>
  );
}
