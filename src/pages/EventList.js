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
import MenuList from "./MenuList";
import "./Home.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function EventList() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [show, setShow] = useState(false);
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

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
    navigate("/event/new");
  };

  const navigateToAddNewEntry = (e, eventId) => {
    e.stopPropagation();
    navigate(`/entry/new?event=${eventId}`);
  };
  const navigateToEntryList = (id) => {
    navigate(`/entryList?event=${id}`);
  };

  const moveToFrontPage = () => {
    navigate("/frontpage");
  };

  const fetchAllEvents = () => {
    axios.get("http://localhost:2023/events").then((response) => {
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
    axios.delete(`http://localhost:2023/events/${eventId}`).then((response) => {
      console.log(response);
      fetchAllEvents();
      navigate("/eventslist");
    });
  };

  return (
    <div className="eventlist-container">
      <>
        <h1 className="entry-title">Total Events List</h1>
        <div className="eventlist-content">
          {eventsList.length > 0 && (
            <>
              {eventsList.map((singleEvent, id) => (
                <div
                  className="card-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Navigating to entry list");
                    navigateToEntryList(singleEvent.id);
                  }}
                >
                  {/* {eventsList.map((singleEvent, id) => ( */}
                  <Card sx={{ maxWidth: 345 }} className="card">
                    <CardHeader
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   console.log("Navigating to entry list");
                      //   navigateToEntryList(singleEvent.id);
                      // }}
                      // avatar={
                      //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                      // }
                      action={
                        <IconButton aria-label="settings">
                          <MenuList className="more-icon" />
                        </IconButton>
                      }
                      title={singleEvent.name}
                      subheader={singleEvent.date}
                    />
                    <CardMedia className="card-image" height="194" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
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
      </>
      <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon">
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={navigateToAddNewEvent} />
        </Fab>
      </Box>
    </div>
  );
}
