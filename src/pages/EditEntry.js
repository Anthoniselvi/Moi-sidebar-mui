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
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EditEntry() {
  const [entries, setEntries] = useState([]);
  const [personName, setPersonName] = useState();
  const [city, setCity] = useState();
  const [amount, setAmount] = useState();
  const [gift, setGift] = useState();
  const [presentType, setPresentType] = useState("");
  const [eventId, setEventId] = useState();

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const entryId = searchParam.get("entry");
  console.log("EditEntry recd entryId by searchParam :" + entryId);
  const handleSubmitEditEntry = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:2010/entries/", {
        entryId: entryId,
        personName: personName,
        city: city,
        presentType: presentType,
        amount: amount,
        gift: gift,
        // eventId: eventId,
      })
      .then((response) => {
        console.log("Updated entry : " + JSON.stringify(response));

        axios
          .get(`http://localhost:2010/entries/eventId/${entryId}`)
          .then((response) => {
            console.log(
              "EventId recd from entries :" + JSON.stringify(response)
            );

            navigate(`/entrylist?event=${response.data.eventId}`);
          });
      });
  };

  const navigateToEntryList = () => {
    axios
      .get(`http://localhost:2010/entries/eventId/${entryId}`)
      .then((response) => {
        console.log("EventId recd from entries :" + JSON.stringify(response));

        navigate(`/entrylist?event=${response.data.eventId}`);
      });
  };

  const deleteEntry = (entryId) => {
    axios
      .delete(`http://localhost:2010/entries/${entryId}`)
      .then((response) => {
        console.log("after deletion response:" + response);
        console.log(
          "after deletion response data:" + JSON.stringify(response.data)
        );

        axios
          .get(`http://localhost:2010/entries/all/${eventId}`)
          .then((response) => {
            console.log(
              "after deletion get All entries:" + JSON.rectify(response.data)
            );
            setEntries(response.data);
          });
        navigate(`/entrylist?event=${eventId}`);
      });
    // });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2010/entries/eventId/${entryId}`)
      .then((response) => {
        console.log(response);
        console.log(response.data.eventId);
        axios
          .get(`http://localhost:2010/entries/all/${response.data.eventId}`)
          .then((response) => {
            console.log(response);
            console.log(response.data);
            setEntries(response.data);
          });
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:2010/entries/${entryId}`).then((response) => {
      console.log("get selected Entry's data : " + JSON.stringify(response));
      setPersonName(response.data.personName);
      setCity(response.data.city);
      setPresentType(response.data.presentType);
      setAmount(response.data.amount);
      setGift(response.data.gift);
    });
    axios
      .get(`http://localhost:2010/entries/eventId/${entryId}`)
      .then((response) => {
        console.log("EventId recd from entries :" + JSON.stringify(response));
        setEventId(response.data.eventId);
      });
  }, []);

  return (
    <div className="editentry_container">
      <div className="editentry_header">
        <ArrowBackIcon onClick={navigateToEntryList} />

        <h2>Update Entry</h2>

        <IconButton aria-label="settings">
          <DeleteIcon
            style={{ color: "#FFFFFF" }}
            onClick={() => deleteEntry(entryId)}
          />
        </IconButton>
      </div>

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
          sx={{ width: "300px", marginBottom: "5%" }}
        />
        <TextField
          id="outlined-place"
          // label="City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          sx={{ width: "300px", marginBottom: "5%" }}
        />

        <div className="radio-box">
          <FormControl>
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
                  // defaultChecked={selected === 1}
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
                // {presentType === "gift" && (
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
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#9C27B0" }}
        >
          Update
        </Button>
      </Box>
      {/* <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon">
        <Fab color="primary" aria-label="add">
          <ArrowBackIcon onClick={navigateToEntryList} />
        </Fab>
      </Box> */}
    </div>
  );
}
