import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import Button from "@mui/material/Button";

export default function EditEntry() {
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState();
  const [gift, setGift] = useState();
  const [selected, setSelected] = useState("amount");

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const entryId = searchParam.get("entry");

  const handleSubmitEditEntry = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:2023/entries/", {
        id: parseInt(entryId),
        personName: personName,
        city: city,
        amount: amount,
        gift: gift,
      })
      .then((response) => {
        console.log(response);
        navigate("/eventslist");
      });
    navigate(`/entrylist?event=${entryId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:2023/entries/${entryId}`).then((response) => {
      console.log(response);
      setPersonName(response.data.personName);
      setCity(response.data.city);
      setAmount(response.data.amount);
      setGift(response.data.gift);
    });
  }, []);

  return (
    <div className="addevent-container">
      <h1>Edit Entry</h1>

      <Box
        onSubmit={handleSubmitEditEntry}
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
          // label="Person Name"
          onChange={(e) => setPersonName(e.target.value)}
          value={personName}
          sx={{ width: "300px" }}
        />
        <TextField
          id="outlined-place"
          // label="City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          sx={{ width: "300px" }}
        />
        <div className="radio-box">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of Presentation :
            </FormLabel>
            <RadioGroup
              // defaultValue="amount">
              defaultValue={amount > 0 ? "amount" : "gift"}
            >
              <div className="radio-button">
                <FormControlLabel
                  control={<Radio />}
                  label="Amount"
                  value="amount"
                  type="number"
                  // defaultChecked={selected === "amount"}
                  checked={selected === "amount"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Gift"
                  value="gift"
                  // defaultChecked={selected === "gift"}
                  checked={selected === "gift"}
                  onChange={(e) => setSelected(e.target.value)}
                />
              </div>
              {selected === "amount" && (
                <TextField
                  id="outlined-date"
                  // label="Rs."
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  sx={{ width: "300px" }}
                />
              )}
              {selected === "gift" && (
                <div className="gift-box">
                  <TextField
                    id="outlined-multiline-static"
                    // label="about gift"
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
        <Button variant="contained" type="submit">
          Update
        </Button>
      </Box>
    </div>
  );
}
