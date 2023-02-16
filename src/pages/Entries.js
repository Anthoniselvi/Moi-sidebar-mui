import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./Home.css";
import "./style.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "./Header";
import { AiOutlineArrowLeft, AiFillEdit } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsPersonCircle, BsFillPersonFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import Avatar from "react-avatar";
import axios from "axios";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CSVLink } from "react-csv";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

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
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const navigateToAddNewEntry = () => {
    // e.stopPropagation();
    navigate(`/entry/new?event=${eventId}`);
  };

  const editEvent = (e, eventId) => {
    e.stopPropagation();
    navigate(`/editevent?event=${eventId}`);
  };

  const deleteEvent = () => {};
  const navigateToEventslist = (id) => {
    axios
      .get(`http://localhost:2010/events/profileId/${eventId}`)
      .then((response) => {
        console.log("recd profileId from event : " + JSON.stringify(response));
        console.log(response.data.profileId);
        // setEntries(response.data);
        navigate(`/eventslist?profile=${response.data.profileId}`);
      });
  };

  const editEntry = (entryId) => {
    navigate(`/editentry?entry=${entryId}`);
  };

  const deleteEntry = (entryId) => {
    console.log(entries);

    // const entryArray = entries.filter((item) => {
    //   return item.id !== id;
    // });
    // setEntries(entryArray);
    // console.log(entryArray);
    axios
      .delete(`http://localhost:2010/entries/${entryId}`)
      .then((response) => {
        console.log("after deletion:" + response);
        console.log(response.data);
        axios
          .get(`http://localhost:2010/entries/all/${eventId}`)
          .then((response) => {
            console.log(eventId);
            console.log(response);
            console.log(response.data);
            setEntries(response.data);
          });
        // setEntries(response.data);
        // navigate(`/entryList?event=${eventId}`);
        // console.log(entryId);
        // navigate("/eventslist");
      });
  };
  const fetchAllEvents = () => {
    // axios
    //   .get(`http://localhost:2010/events/profileId/${eventId}`)
    //   .then((response) => {
    //     console.log("recd profileId from event : " + JSON.stringify(response));
    //     console.log(response.data.profileId);

    axios.get(`http://localhost:2010/events/${eventId}`).then((response) => {
      // console.log(response);
      console.log(response.data);
      setEventsList(response.data);
    });
    console.log(eventslist.name);
    // });
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
        onClick={handlePrint}
      >
        Export
      </Button>
      <Search className="entrieslist_search">
        <SearchIconWrapper onChange={onChangeHandle}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{
            border: "1px solid #9C27B0",
            alignItems: "right",
            width: "100%",
          }}
          onChange={onChangeHandle}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      {entries.length > 0 && (
        <>
          {entries.map((entry) => (
            <Card sx={{ width: "100%" }} ref={componentRef}>
              {entry.presentType === "amount" ? (
                <CardHeader
                  avatar={
                    <Avatar
                      name={entry.personName}
                      size="35"
                      round={true}
                      maxInitials="1"
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("set show clicked..");
                          setSelectedEntry(entry.entryId);
                          // setShow((show) => !show);
                          setAnchorEl(e.currentTarget);
                        }}
                      />
                    </IconButton>
                  }
                  title={entry.personName}
                  subheader={entry.amount}
                />
              ) : (
                <CardHeader
                  avatar={
                    <Avatar
                      name={entry.personName}
                      size="35"
                      round={true}
                      maxInitials="1"
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("set show clicked..");
                          setSelectedEntry(entry.entryId);
                          // setShow((show) => !show);
                          setAnchorEl(e.currentTarget);
                        }}
                      />
                    </IconButton>
                  }
                  title={entry.personName}
                  subheader={entry.gift}
                  // disableTypography={true}
                />
              )}

              {/* <Box */}
              {/* //   sx={{ flexGrow: 1, overflow: "hidden", px: 1 }}
            //   key={entry.entryId}
            // >
            //   <StyledPaper */}
              {/* //     sx={{ */}
              {/* //       my: 1,
            //       mx: "auto",
            //       p: 1,
            //     }}
            //   >
            //     <Grid container wrap="nowrap" spacing={4}>
            //       <Grid item xs alignSelf="center">
            //         <Avatar */}
              {/* //           name={entry.personName}
            //           size="35"
            //           round={true}
            //           maxInitials="1"
            //         /> */}
              {/* //       </Grid> */}
              {/* //       <Grid */}
              {/* //         item
            //         xs
            //         alignSelf="center"
            //         sx={{ width: "max-content" }}
            //       >
            //         <Typography */}
              {/* //           sx={{ */}
              {/* //             alignItems: "left",
            //             justifyItems: "center",
            //             // width: "max-content",
            //           }}
            //         >
            //           {entry.personName}
            //         </Typography> */}
              {/* //       </Grid> */}
              {/* //       <Grid item xs alignSelf="center">
            //         {entry.presentType === "amount" ? ( */}
              {/* //           <Typography */}
              {/* //             sx={{ alignItems: "left", justifyItems: "center" }}
            //           >
            //             {" "}
            //             {entry.amount}
            //           </Typography> */}
              {/* //         ) : (
            //           <Typography */}
              {/* //             sx={{ alignItems: "left", justifyItems: "center" }}
            //           >
            //             {" "}
            //             {entry.gift}
            //           </Typography> */}
              {/* //         )}
            //       </Grid> */}
              {/* //       <Grid item xs alignSelf="right">
            //         <IconButton */}
              {/* //           aria-label="settings"
            //           className="more-icon"
            //           // className="event_icon_dropdown"
            //           onClick={(e) => { */}
              {/* //             e.stopPropagation();
            //             console.log("set show clicked..");
            //             setSelectedEntry(entry.entryId);
            //             // setShow((show) => !show);
            //             setAnchorEl(e.currentTarget);
            //           }}
            //         >
            //           <MoreVertIcon />
            //         </IconButton> */}
              {entry.entryId === selectedEntry && anchorEl ? (
                <Menu
                  className="entry_dropdown"
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => editEntry(entry.entryId)}>
                    Update
                  </MenuItem>
                  <MenuItem onClick={() => deleteEntry(entry.entryId)}>
                    Delete
                  </MenuItem>
                </Menu>
              ) : null}
              {/* //       </Grid> */}
              {/* //       <p>
            //         {data.totalAmount}, {data.totalGift}
            //       </p>
            //     </Grid> */}
              {/* // <Grid>
            //       <Grid>
            //         <Typography>{data.totalAmount}</Typography>
            //       </Grid>
            //       <Grid>
            //         <Typography>{data.totalGift}</Typography>
            //       </Grid>
            //     </Grid>
            //   </StyledPaper> */}
              {/* </Box> */}
            </Card>
          ))}
        </>
      )}
      {entries.length < 1 && <p className="no-text">No Entries found</p>}
      <CSVLink data={entries}>Download</CSVLink>
    </div>
  );
}
