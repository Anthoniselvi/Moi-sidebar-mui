import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "./ConfirmDialog";
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
import Entries from "./Entries";
import ShareButton from "./Share";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import ShareLinks from "./ShareLinks";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));
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

export default function EntriesList(props) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  // const entryId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
  const [eventslist, setEventsList] = useState({});
  const [selectedEntry, setSelectedEntry] = useState("");
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedEvent, setSelectedEvent] = useState("");
  console.log("entrylist-recd-eventId : " + eventId);
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => setIsOpen(!isOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event) => {
    // event.stopPropagation();
    // setAnchorEl(event.currentTarget);
    // console.log("set show clicked..");
    // setSelectedEntry(entry.id);
    // setShow((show) => !show);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const totalAmount = entries
    .map((entry) => entry.amount)
    .reduce((acc, value) => acc + +value, 0);

  const totalGift = entries.filter((entry) => entry.gift !== "").length;

  const navigateToAddNewEntry = () => {
    // e.stopPropagation();
    navigate(`/entry/new?event=${eventId}`);
  };

  const editEvent = (e, eventId) => {
    e.stopPropagation();
    navigate(`/editevent?event=${eventId}`);
  };

  const deleteEvent = (e, eventId) => {
    setAnchorEl(null);
    // if (window.confirm("Do you want to Delete")) {
    e.stopPropagation();
    console.log(eventId);

    axios
      .delete(`http://localhost:2010/entries/all/${eventId}`)
      .then((response) => {
        console.log("deleted entries list :" + JSON.stringify(response));
        // fetchAllEvents();
        // navigate("/eventslist");
      });
    axios.delete(`http://localhost:2010/events/${eventId}`).then((response) => {
      console.log("deleted event : " + JSON.stringify(response));
      fetchAllEvents();
      // navigate(`/eventslist?profile=${profileId}`);
    });
    axios
      .get(`http://localhost:2010/events/profileId/${eventId}`)
      .then((response) => {
        console.log("recd profileId from event : " + JSON.stringify(response));
        console.log(response.data.profileId);
        // setEntries(response.data);
        navigate(`/eventslist?profile=${response.data.profileId}`);
      });
    // }
  };
  const printEvent = () => {
    navigate(`/pdf?event=${eventId}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    // setAnchorEl(null);
  };

  const closeDialog = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };
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
  useEffect(() => {
    fetchAllEntries();
    fetchAllEvents();
  }, []);

  const navigateToShareLinks = () => {
    console.log("share button clicked");
    <ShareLinks />;
  };
  return (
    <div className="entrylist_container">
      <div className="entries_header">
        <div className="entries_header_left">
          <ArrowBackIcon onClick={navigateToEventslist} />
          <h2 className="entrylist-head">{eventslist.name}</h2>
        </div>
        <div className="entries_header_right">
          <ShareIcon
            style={{ color: "#FFFFFF" }}
            onClick={(e) => {
              // e.stopPropagation();
              console.log("set show clicked..");
              setShow((show) => !show);
            }}
          />
          {/* <ShareButton
          title="List of Moi Enties"
          text="Check out this link!"
          url="www.google.com"
        /> */}
          {/* {show ? (
          <div>
            <WhatsappShareButton url="https://localhost:3000/">
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url="https://localhost:3000/">
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
          </div>
        ) : null} */}

          <div className="head-body">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              // onClick={handleClick}
              onClick={(e) => {
                e.stopPropagation();
                console.log("set show clicked..");
                setSelectedEvent(eventslist.eventId);
                // setShow((show) => !show);
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVertIcon style={{ color: "#FFFFFF" }} />
            </Button>
            {eventslist.eventId === selectedEvent && anchorEl ? (
              <>
                <Menu
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
                  <MenuItem onClick={(e) => editEvent(e, eventslist.eventId)}>
                    Update
                  </MenuItem>

                  <MenuItem
                    onClick={handleOpenDialog}

                    // onClick={(e) => deleteEvent(e, eventslist.eventId)}
                  >
                    Delete
                  </MenuItem>

                  <MenuItem onClick={(e) => printEvent(e, eventslist.eventId)}>
                    Export in Pdf
                  </MenuItem>
                </Menu>
                <Dialog
                  fullScreen={fullScreen}
                  open={openDialog}
                  onClose={closeDialog}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    Delete Confirmation
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Do You want to delete the entry permanently?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={closeDialog}>
                      No
                    </Button>
                    <Button
                      onClick={(e) => deleteEvent(e, eventslist.eventId)}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar
            sx={{ backgroundColor: "#9C27B0" }}
            // className="entrylist_header"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon onClick={navigateToEventslist} />
            </IconButton>

            <Typography
              className="event-name"
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, fontSize: 16, alignSelf: "center" }}
            >
              {eventslist.name}
            </Typography> */}

      {/* <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton> */}
      {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
      {/* <IconButton aria-label="share">
              <ShareIcon style={{ color: "#FFFFFF" }} />
            </IconButton> */}

      {/* <div className="head-body">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // onClick={handleClick}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("set show clicked..");
                  setSelectedEvent(eventslist.eventId);
                  // setShow((show) => !show);
                  setAnchorEl(e.currentTarget);
                }}
              >
                <MoreVertIcon style={{ color: "#FFFFFF" }} />
              </Button>
              {eventslist.eventId === selectedEvent && anchorEl ? (
                <Menu
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
                  <MenuItem onClick={(e) => editEvent(e, eventslist.eventId)}>
                    Update
                  </MenuItem>

                  <MenuItem onClick={(e) => deleteEvent(e, eventslist.eventId)}>
                    Delete
                  </MenuItem>
                </Menu>
              ) : null}
            </div> */}
      {/* </StyledToolbar>
        </AppBar>
      </Box> */}
      <div className="entry_body">
        <Entries />
        {show ? (
          <div
            className="share_box"
            style={{
              display: show ? "block" : "none",
              color: "#fff",
              backgroundColor: "red",
            }}
          >
            <WhatsappShareButton url="https://localhost:3000/">
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url="https://localhost:3000/">
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
          </div>
        ) : null}
        <div className="add-btn">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="secondary" aria-label="add">
              <AddIcon onClick={navigateToAddNewEntry} />
            </Fab>
          </Box>
        </div>
      </div>
    </div>
  );
}
