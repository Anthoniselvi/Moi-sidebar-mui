import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import "./Home.css";
import "./style.css";

export default function AddNewEntry() {
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState(0);
  const [gift, setGift] = useState("");
  const [presentType, setPresentType] = useState("amount");
  // const [entries, setEntries] = useState();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const profileId = searchParam.get("id");
  console.log("Add New Entry-recd-eventId : " + eventId);
  const handleSubmitEntry = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:2010/entries", {
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
        eventId: eventId,
      })
      .then((response) => {
        console.log("Post new Entry Response : " + JSON.stringify(response));
        navigate(`/entryList?event=${eventId}`);
      });

    setPersonName("");
    setCity("");
    setPresentType("");
    setAmount("");
    setGift("");
  };

  const navigateToEntryList = () => {
    navigate(`/entryList?event=${eventId}`);
  };

  return (
    <div className="addentry_container">
      <div className="addentry_header">
        <ArrowBackIcon onClick={navigateToEntryList} />

        <h2>Create Entry</h2>
      </div>

      <Box
        onSubmit={handleSubmitEntry}
        className="addevent-form"
        component="form"
        // sx={{
        //   "& > :not(style)": { m: 1, width: "50ch" },
        // }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Person Name"
          onChange={(e) => setPersonName(e.target.value)}
          value={personName}
          sx={{ width: "300px", marginBottom: "5%" }}
        />
        <TextField
          id="outlined-place"
          label="City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          sx={{ width: "300px", marginBottom: "5%" }}
        />
        <div className="radio-box">
          <FormControl sx={{ marginBottom: "5%" }}>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of Presentation :
            </FormLabel>
            <RadioGroup
              value={presentType}
              onChange={(e) => setPresentType(e.target.value)}
            >
              <div className="radio-button">
                <FormControlLabel
                  control={<Radio />}
                  label="Amount"
                  value="amount"
                  // defaultChecked={selected === "amount"}
                  // onChange={(e) => setSelected(e.target.value)}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Gift"
                  value="gift"
                  // defaultChecked={selected === 0}
                  // onChange={(e) => setSelected(e.target.value)}
                />
              </div>
              {presentType === "amount" ? (
                <div>
                  <TextField
                    id="outlined-amount"
                    label="Rs."
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    sx={{ width: "300px", marginBottom: "5%" }}
                  />
                </div>
              ) : (
                <div className="gift-box">
                  <TextField
                    id="outlined-multiline-static"
                    label="about gift"
                    multiline
                    rows={4}
                    sx={{ width: "300px", marginBottom: "5%" }}
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                  />
                </div>
              )}
              {/* {selected === 0 ? (
                <div className="gift-box">
                  <TextField
                    id="outlined-multiline-static"
                    label="about gift"
                    multiline
                    rows={4}
                    sx={{ width: "300px" }}
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                  />
                </div>
              ) : (
                <div>
                  <TextField
                    id="outlined-amount"
                    label="Rs."
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    sx={{ width: "300px" }}
                  />
                </div>
              )} */}
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#9C27B0" }}
        >
          Add
        </Button>
        {/* <Button type="submit">Add</Button> */}
      </Box>
      {/* <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon">
        <Fab color="primary" aria-label="add">
          <ArrowBackIcon onClick={navigateToEntryList} />
        </Fab>
      </Box> */}
    </div>
  );
}
