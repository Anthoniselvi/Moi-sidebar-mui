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
      <form onSubmit={handleSubmitEditEntry}>
        <Box
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

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Type of Presentation :
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                control={<Radio />}
                label="Amount"
                value="amount"
                defaultChecked={selected === "amount"}
                onChange={(e) => setSelected(e.target.value)}
              />
              <TextField
                id="outlined-date"
                label="amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                sx={{ width: "300px" }}
              />
              <FormControlLabel
                control={<Radio />}
                label="Gift"
                value="gift"
                defaultChecked={selected === "gift"}
                onChange={(e) => setSelected(e.target.value)}
              />
              {selected === "gift" && (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    label="about gift"
                    multiline
                    rows={4}
                    onChange={(e) => setGift(e.target.value)}
                    value={gift}
                  />
                </>
              )}
            </RadioGroup>
          </FormControl>
          <button className="addevent-button">Update Entry</button>
        </Box>
      </form>
    </div>
  );
}
