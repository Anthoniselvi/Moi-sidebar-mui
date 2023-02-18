import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "react-avatar";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Entries() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [data, setData] = useState([]);
  const eventId = searchParam.get("event");
  const profileId = searchParam.get("profile");
  const [entries, setEntries] = useState([]);
  const [eventslist, setEventsList] = useState({});
  const [selectedEntry, setSelectedEntry] = useState("");
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedEvent, setSelectedEvent] = useState("");
  console.log("entrylist-recd-eventId : " + eventId);

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalAmount = entries
    .map((entry) => entry.amount)
    .reduce((acc, value) => acc + +value, 0);

  const totalGift = entries.filter((entry) => entry.gift !== "").length;

  function onChangeHandle(e) {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "") {
      window.location.reload(true);
      const tempArr = entries;
      setEntries(tempArr);
      return;
    }
    const searchResult = entries.filter((entry) =>
      entry.personName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setEntries(searchResult);
  }

  const fetchAllEvents = () => {
    axios.get(`http://localhost:2010/events/${eventId}`).then((response) => {
      console.log(response.data);
      setEventsList(response.data);
    });
    console.log(eventslist.name);
  };
  const fetchAllEntries = () => {
    axios
      .get(`http://localhost:2010/entries/all/${eventId}`)
      .then((response) => {
        console.log(eventId);
        console.log(response);
        console.log(response.data);
        setEntries(response.data);
      });
  };

  const getTotal = () => {
    axios
      .get(`http://localhost:2010/events/profileId/${eventId}`)
      .then((response) => {
        console.log("recd profileId from event : " + JSON.stringify(response));
        console.log(response.data.profileId);
        // setEntries(response.data);
        axios
          .get(
            `http://localhost:2010/events/total/all/${response.data.profileId}`
          )
          .then((response) => {
            // console.log(response);
            console.log(
              "total recd in useEffect : " + JSON.stringify(response.data)
            );
            setData(response.data);
            console.log("Recd Data in useEffect : " + JSON.stringify(data));
          });
      });
  };
  useEffect(() => {
    fetchAllEntries();
    fetchAllEvents();
    getTotal();
  }, []);

  return (
    <div className="entrieslist_container">
      <Button
        sx={{
          backgroundColor: "#9C27B0",
          color: "#FFFFFF",
        }}
        onClick={handleExportWithComponent}
      >
        Download
      </Button>

      <PDFExport ref={pdfExportComponent}>
        <h1 style={{ textAlign: "center" }}>{eventslist.name}</h1>

        <table className="entry-table">
          <thead>
            <tr>
              <th></th>
              <th>Person Name</th>
              <th>City</th>
              <th>Amount (Rs.)</th>
              <th>Gift</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <Avatar
                    name={entry.personName}
                    size="35"
                    round={true}
                    maxInitials="1"
                  />
                </td>
                <td>{entry.personName}</td>
                <td>{entry.city}</td>
                <td>{entry.amount}</td>
                <td>{entry.gift}</td>
              </tr>
            ))}
            <tr className="total-entry">
              <td></td>
              <td>
                <b>Total</b>
              </td>

              <td>
                <b>{totalAmount}</b>
              </td>
              <td>
                <b>{totalGift}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </PDFExport>
      {/* {entries.length < 1 && <p className="no-text">No Entries found</p>} */}
    </div>
  );
}
