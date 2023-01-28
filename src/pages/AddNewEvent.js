import * as React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import image1 from "../images/family.jpg";
import image2 from "../images/family1.jpg";
import image3 from "../images/family2.jpg";
import image4 from "../images/family3.jpg";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     border: "1px solid red",
//   },
// }));
const images = {
  wedding: image1,
  others: image2,
  baby: image3,
  birthday: image4,
};
export default function AddNewEvent() {
  // const classes = useStyles();
  const [imageSource, setImageSource] = useState("");
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2023/events", {
        eventType: eventType,
        name: name,
        place: place,
        date: date,
        profileId: id,
      })
      .then((response) => {
        console.log(response);
        navigate(`/eventslist?id=${id}`);
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
        {/* <img src={imageSource} alt="Image" /> */}
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
