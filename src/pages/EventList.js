import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuList from "./MenuList";
import "./Home.css";
import Header from "./Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Add from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import image1 from "../images/family.jpg";
import image2 from "../images/family1.jpg";
import image3 from "../images/family2.jpg";
import image4 from "../images/family3.jpg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const images = {
  wedding: image1,
  others: image2,
  baby: image3,
  birthday: image4,
};
export default function EventList(props) {
  const [expanded, setExpanded] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [show, setShow] = useState(false);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getTotalAmount = (eventId) => {
    console.log(eventId);

    const totalAmount = entries
      .filter((entry) => entry.eventId === eventId)
      .map((entry) => parseInt(entry.amount))
      .reduce((acc, value) => acc + +value, 0);

    return totalAmount;
  };

  const gettotalGiftforEvent = (eventId) => {
    return entries.filter(
      (entry) => entry.eventId === eventId && entry.gift !== ""
    ).length;
  };

  const navigateToAddNewEvent = (e) => {
    e.stopPropagation();
    navigate(`/event/new?id=${profileId}`);
  };

  const navigateToAddNewEntry = (e, eventId) => {
    e.stopPropagation();
    navigate(`/entry/new?id=${profileId}&event=${eventId}`);
  };
  const navigateToEntryList = (id) => {
    navigate(`/entryList?event=${id}`);
  };

  // const handleClick = () => {
  //   return <MenuList />;
  // };
  const moveToFrontPage = () => {
    navigate("/frontpage");
  };
  const openMenu = () => {
    <MenuList />;
  };
  const fetchAllEvents = () => {
    axios
      .get(`http://localhost:2023/events/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios.get("http://localhost:2023/entries").then((response) => {
      // console.log(response);
      console.log(response.data);
      setEntries(response.data);
    });
  };
  useEffect(() => {
    fetchAllEvents();
    fetchAllEntries();
  }, []);

  const editEvent = (e, id) => {
    e.stopPropagation();
    navigate(`/event?event=${id}`);
  };

  const deleteEvent = (e, eventId) => {
    e.stopPropagation();

    console.log(eventId);

    axios
      .delete(`http://localhost:2023/entries/all/${eventId}`)
      .then((response) => {
        console.log(response);
        // fetchAllEvents();
        // navigate("/eventslist");
      });
    axios.delete(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      fetchAllEvents();
      navigate("/eventslist");
    });
  };

  return (
    <div className="eventlist-container">
      <Header />
      <div className="eventlist-body">
        {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2> */}
        <h1 className="entry-title">Total Events List</h1>
        <div className="eventlist-content">
          {eventsList.length > 0 && (
            <>
              {eventsList.map((singleEvent, id) => (
                <div
                  className="card-container"
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   navigateToEntryList(singleEvent.id);
                  // }}
                >
                  {/* {eventsList.map((singleEvent, id) => ( */}
                  <Card
                    sx={{
                      maxWidth: 345,
                      borderRadius: "10px",
                      border: "#ffff3f",
                    }}
                    className="card"
                  >
                    <div className="card-header">
                      <CardHeader
                        sx={{ backgroundColor: "#ffff3f", color: "#03045e" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Navigating to entry list");
                          navigateToEntryList(singleEvent.id);
                        }}
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Navigating to entry list");
                              navigateToEntryList(singleEvent.id);
                            }}
                          ></Avatar>
                        }
                        title={singleEvent.name}
                        subheader={singleEvent.date}
                      />
                      <IconButton
                        aria-label="settings"
                        // className="more-icon"
                        className="event_icon_dropdown"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("set show clicked..");
                          setSelectedEvent(singleEvent.id);
                          setShow((show) => !show);
                        }}
                      >
                        {/* <MenuList /> */}
                        <MoreVertIcon />
                      </IconButton>

                      {singleEvent.id === selectedEvent && show ? (
                        <div className="event_dropdown">
                          <p
                            onClick={(e) =>
                              navigateToAddNewEntry(e, singleEvent.id)
                            }
                          >
                            Add Entry
                          </p>
                          <p onClick={(e) => editEvent(e, singleEvent.id)}>
                            Edit Event
                          </p>
                          <p onClick={(e) => deleteEvent(e, singleEvent.id)}>
                            Delete Event
                          </p>
                        </div>
                      ) : null}
                      {/* <Button
                        id="demo-positioned-button"
                        aria-controls={
                          open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // onClick={handleClick}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("set show clicked..");
                          setSelectedEvent(singleEvent.id);
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        // className="entry_dropdown"
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
                      > */}
                      {/* <MenuItem
                        onClick={(e) =>
                          navigateToAddNewEntry(e, singleEvent.id)
                        }
                      >
                        Add Event
                      </MenuItem> */}
                      {/* <MenuItem onClick={(e) => editEvent(e, singleEvent.id)}>
                          Edit Event
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => deleteEvent(e, singleEvent.id)}
                        >
                          Delete Event
                        </MenuItem>
                      </Menu> */}
                    </div>
                    {/* </div> */}
                    {/* <CardMedia
                      className="card-image"
                      height="194"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToEntryList(singleEvent.id);
                      }}
                    /> */}
                    {singleEvent.eventType === "birthday" ? (
                      <CardMedia
                        className="card-image-birthday"
                        height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.id);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "wedding" ? (
                      <CardMedia
                        className="card-image-wedding"
                        height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.id);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "baby" ? (
                      <CardMedia
                        className="card-image-baby"
                        height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.id);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "others" ? (
                      <CardMedia
                        className="card-image-other"
                        height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.id);
                        }}
                      />
                    ) : null}
                    <CardContent sx={{ backgroundColor: "#ffff3f" }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.id);
                        }}
                      >
                        <ul className="event-list">
                          <li>
                            <p>Total Amount - Rs.</p>
                            <span>{getTotalAmount(singleEvent.id)}</span>
                          </li>
                          <li>
                            <p>Total No.of Gifts - </p>
                            <span>{gettotalGiftforEvent(singleEvent.id)}</span>
                          </li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
        {eventsList.length < 1 && (
          <>
            <p className="no-text">No Events found</p>

            <button className="addevent-button" onClick={navigateToAddNewEvent}>
              Add New Event
            </button>
          </>
        )}
        {/* </div> */}
        {/* </> */}
        <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon1">
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={navigateToAddNewEvent} />
          </Fab>
        </Box>
      </div>
    </div>
  );
}
