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
import "./Home.css";

export default function AddNewEntry() {
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState(0);
  const [gift, setGift] = useState();
  const [selected, setSelected] = useState("amount");

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const handleSubmitEntry = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:2023/entries", {
        personName: personName,
        city: city,
        amount: amount,
        gift: gift,
        eventId: eventId,
      })
      .then((response) => {
        console.log(response);
        navigate(`/entryList?event=${eventId}`);
        console.log(eventId);
      });

    setPersonName("");
    setCity("");
    setAmount("");
    setGift("");
  };

  return (
    <div className="addevent-container">
      <h1>Add New Entry</h1>

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
          sx={{ width: "300px" }}
        />
        <TextField
          id="outlined-place"
          label="City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          sx={{ width: "300px" }}
        />
        <div className="radio-box">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of Presentation :
            </FormLabel>
            <RadioGroup defaultValue="amount">
              <div className="radio-button">
                <FormControlLabel
                  control={<Radio />}
                  label="Amount"
                  value="amount"
                  type="number"
                  defaultChecked={selected === "amount"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Gift"
                  value="gift"
                  defaultChecked={selected === "gift"}
                  onChange={(e) => setSelected(e.target.value)}
                />
              </div>
              {selected === "amount" && (
                <TextField
                  id="outlined-amount"
                  label="Rs."
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  sx={{ width: "300px" }}
                />
              )}

              {selected === "gift" && (
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
              )}
            </RadioGroup>
          </FormControl>
        </div>
        {/* <Button variant="contained" type="submit">
          Add
        </Button> */}
        <Button type="submit">Add</Button>
      </Box>
    </div>
  );
}
