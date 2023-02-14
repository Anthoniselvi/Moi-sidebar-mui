import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, CardActionArea } from "@mui/material";
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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import "./Home.css";
import "./style.css";
import Header from "./Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Add from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import image1 from "../images/family.jpg";
import image2 from "../images/family1.jpg";
import image3 from "../images/family2.jpg";
import image4 from "../images/family3.jpg";
import Currency from "react-currency-icons";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

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
  const [profile, setProfile] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [show, setShow] = useState(false);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  console.log("eventslist-recd-profileId : " + profileId);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

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
    console.log("eventslist-navigate-profileId : " + profileId);
    navigate(`/event/new?profile=${profileId}`);
  };

  // const navigateToAddNewEntry = (e, eventId) => {
  //   e.stopPropagation();
  //   navigate(`/entry/new?id=${profileId}&event=${eventId}`);
  // };
  const navigateToEntryList = (eventId) => {
    navigate(`/entryList?event=${eventId}`);
  };

  // const handleClick = () => {
  //   return <MenuList />;
  // };
  const moveToFrontPage = () => {
    navigate("/dashboard");
  };
  const openMenu = () => {
    <MenuList />;
  };
  const fetchAllEvents = () => {
    axios
      .get(`http://localhost:2010/events/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios.get("http://localhost:2010/entries").then((response) => {
      // console.log(response);
      console.log(response.data);
      setEntries(response.data);
    });
  };
  useEffect(() => {
    fetchAllEvents();
    fetchAllEntries();
  }, []);

  const editEvent = (e, eventId) => {
    e.stopPropagation();
    navigate(`/editevent?event=${eventId}`);
  };

  const deleteEvent = (e, eventId) => {
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
      navigate(`/eventslist?profile=${profileId}`);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:2010/profile").then((response) => {
      // console.log(response);
      console.log("get profile : " + JSON.stringify(response.data));
      setProfile(response.data);
    });
  }, []);
  return (
    // <div className="eventslist_container">
    //   <Header name={props.name} />
    //   <div className="eventlist_body">
    //     <div className="eventlist_content">
    //       {eventsList.length > 0 && (
    //         <>
    //           {eventsList.map((singleEvent, eventId) => (
    //             <div className="card_container">
    //               <Card
    //                 sx={{
    //                   maxWidth: 345,
    //                   borderRadius: "10px",
    //                   border: "#ffff3f",
    //                 }}
    //                 className="card"
    //               >
    //                 <div className="card_header">
    //                   <CardHeader
    //                     className="card_heading"
    //                     sx={{ backgroundColor: "#ffff3f", color: "#03045e" }}
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       console.log("Navigating to entry list");
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                     avatar={
    //                       <Avatar
    //                         sx={{ bgcolor: red[500] }}
    //                         aria-label="recipe"
    //                         onClick={(e) => {
    //                           e.stopPropagation();
    //                           console.log("Navigating to entry list");
    //                           navigateToEntryList(singleEvent.eventId);
    //                         }}
    //                       ></Avatar>
    //                     }
    //                     title={singleEvent.name}
    //                     subheader={singleEvent.date}
    //                   />

    //                   <div className="head-body">
    //                     <Button
    //                       id="demo-positioned-button"
    //                       aria-controls={
    //                         open ? "demo-positioned-menu" : undefined
    //                       }
    //                       aria-haspopup="true"
    //                       aria-expanded={open ? "true" : undefined}
    //                       // onClick={handleClick}
    //                       onClick={(e) => {
    //                         e.stopPropagation();
    //                         console.log("set show clicked..");
    //                         setSelectedEvent(singleEvent.eventId);
    //                         // setShow((show) => !show);
    //                         setAnchorEl(e.currentTarget);
    //                       }}
    //                     >
    //                       <MoreVertIcon />
    //                     </Button>
    //                     {singleEvent.eventId === selectedEvent && anchorEl ? (
    //                       <Menu
    //                         id="demo-positioned-menu"
    //                         aria-labelledby="demo-positioned-button"
    //                         anchorEl={anchorEl}
    //                         open={open}
    //                         onClose={handleClose}
    //                         anchorOrigin={{
    //                           vertical: "top",
    //                           horizontal: "left",
    //                         }}
    //                         transformOrigin={{
    //                           vertical: "top",
    //                           horizontal: "left",
    //                         }}
    //                       >
    //                         <MenuItem
    //                           onClick={(e) => editEvent(e, singleEvent.eventId)}
    //                         >
    //                           Update Event
    //                         </MenuItem>

    //                         <MenuItem
    //                           onClick={(e) =>
    //                             deleteEvent(e, singleEvent.eventId)
    //                           }
    //                         >
    //                           Delete Event
    //                         </MenuItem>
    //                       </Menu>
    //                     ) : null}
    //                   </div>
    //                 </div>

    //                 {singleEvent.eventType === "birthday" ? (
    //                   <CardMedia
    //                     className="card-image-birthday"
    //                     height="194"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                   />
    //                 ) : null}
    //                 {singleEvent.eventType === "wedding" ? (
    //                   <CardMedia
    //                     className="card-image-wedding"
    //                     height="194"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                   />
    //                 ) : null}
    //                 {singleEvent.eventType === "baby" ? (
    //                   <CardMedia
    //                     className="card-image-baby"
    //                     height="194"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                   />
    //                 ) : null}
    //                 {singleEvent.eventType === "others" ? (
    //                   <CardMedia
    //                     className="card-image-other"
    //                     height="194"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                   />
    //                 ) : null}
    //                 <CardContent
    //                   className="card_bottom_container"
    //                   sx={{ backgroundColor: "#ffff3f" }}
    //                 >
    //                   <Typography
    //                     className="card_bottom"
    //                     variant="body2"
    //                     color="text.secondary"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       navigateToEntryList(singleEvent.eventId);
    //                     }}
    //                   >
    //                     <ul>
    //                       <li className="amount-row">
    //                         {/* <Currency
    //                           code="INR"
    //                           // size="small"
    //                           style={{ fontSize: "20px" }}
    //                         /> */}
    //                         <CurrencyRupeeIcon
    //                           sx={{ fontSize: "20px", color: "black" }}
    //                         />
    //                         <p style={{ fontSize: "20px", color: "black" }}>
    //                           Amount
    //                         </p>
    //                         <span style={{ fontSize: "20px", color: "black" }}>
    //                           {getTotalAmount(singleEvent.eventId)}
    //                         </span>
    //                       </li>
    //                       <li className="amount-row">
    //                         <CardGiftcardIcon
    //                           sx={{ fontSize: "20px", color: "black" }}
    //                         />
    //                         <p style={{ fontSize: "20px", color: "black" }}>
    //                           {" "}
    //                           No.of Gifts{" "}
    //                         </p>
    //                         <span style={{ fontSize: "20px", color: "black" }}>
    //                           {gettotalGiftforEvent(singleEvent.eventId)}
    //                         </span>
    //                       </li>
    //                     </ul>
    //                   </Typography>
    //                 </CardContent>
    //               </Card>
    //             </div>
    //           ))}
    //         </>
    //       )}
    //     </div>
    //     {eventsList.length < 1 && (
    //       <>
    //         <p className="no-text">No Events found</p>

    //         <button className="addevent-button" onClick={navigateToAddNewEvent}>
    //           Add New Event
    //         </button>
    //       </>
    //     )}

    //     <Box className="add-btn" sx={{ "& > :not(style)": { m: 1 } }}>
    //       <Fab color="secondary" aria-label="add">
    //         <AddIcon onClick={navigateToAddNewEvent} />
    //       </Fab>
    //     </Box>
    //   </div>
    // </div>

    <div className="eventslist_container">
      <Header name={props.name} />
      <div className="eventlist_body">
        {eventsList.length > 0 && (
          <>
            {eventsList.map((singleEvent, eventId) => (
              <div className="card_container">
                <Card>
                  {/* sx={{ width: 200, height: 400 }}> */}
                  <CardActionArea>
                    {singleEvent.eventType === "birthday" ? (
                      <CardMedia
                        className="card-image-birthday"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "wedding" ? (
                      <CardMedia
                        className="card-image-wedding"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "baby" ? (
                      <CardMedia
                        className="card-image-baby"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                    ) : null}
                    {singleEvent.eventType === "others" ? (
                      <CardMedia
                        className="card-image-other"
                        // height="194"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      />
                    ) : null}
                    <CardContent className="card_content">
                      <Typography
                        className="card_name"
                        sx={{ fontSize: 16, marginBottom: 0 }}
                        gutterBottom
                        variant="h5"
                        component="div"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                        {singleEvent.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEntryList(singleEvent.eventId);
                        }}
                      >
                        <ul className="event-row">
                          <li className="amount-row">
                            <>
                              <CurrencyRupeeIcon
                                sx={{ fontSize: "14px", color: "black" }}
                              />
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "black",
                                  margin: 2,
                                }}
                              >
                                Amount
                              </p>
                            </>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#9C27B0",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                              {getTotalAmount(singleEvent.eventId)}
                            </p>
                          </li>
                          <li className="amount-row">
                            <>
                              <CardGiftcardIcon
                                sx={{ fontSize: "14px", color: "black" }}
                              />
                              <p
                                style={{
                                  fontSize: "14px",
                                  color: "black",
                                  margin: 2,
                                }}
                              >
                                {" "}
                                No.of Gifts{" "}
                              </p>
                            </>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "black",
                                margin: 2,
                                alignItems: "right",
                              }}
                            >
                              {gettotalGiftforEvent(singleEvent.eventId)}
                            </p>
                          </li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="add-btn">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="secondary" aria-label="add">
            <AddIcon onClick={navigateToAddNewEvent} />
          </Fab>
        </Box>
      </div>
    </div>
  );
}
