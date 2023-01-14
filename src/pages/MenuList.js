// import * as React from "react";
// import { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import "./Home.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function MenuList() {
//   const [selectedEvent, setSelectedEvent] = useState("");
//   const [eventsList, setEventsList] = useState([]);
//   const [entries, setEntries] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllEvents();
//     fetchAllEntries();
//   }, []);

//   const navigateToAddNewEntry = (e, eventId) => {
//     e.stopPropagation();
//     navigate(`/entry/new?event=${eventId}`);
//   };

//   const editEvent = (e, id) => {
//     e.stopPropagation();
//     navigate(`/event?event=${id}`);
//   };

//   const deleteEvent = (e, eventId) => {
//     e.stopPropagation();

//     console.log(eventId);
//     axios.delete(`http://localhost:2023/events/${eventId}`).then((response) => {
//       console.log(response);
//       fetchAllEvents();
//       navigate("/eventslist");
//     });
//   };

//   const fetchAllEvents = () => {
//     axios.get("http://localhost:2023/events").then((response) => {
//       // console.log(response);
//       console.log(response.data);
//       setEventsList(response.data);
//     });
//   };

//   const fetchAllEntries = () => {
//     axios.get("http://localhost:2023/entries").then((response) => {
//       // console.log(response);
//       console.log(response.data);
//       setEntries(response.data);
//     });
//   };
//   return (
//     <div className="menu-list">
//       {eventsList.map((singleEvent, id) => (
//         <>
//           {singleEvent.id === selectedEvent && (
//             <>
//               <PopupState variant="popover" popupId="demo-popup-menu">
//                 {(popupState) => (
//                   <React.Fragment>
//                     <Button variant="contained" {...bindTrigger(popupState)}>
//                       <MoreVertIcon className="more-icon" />
//                     </Button>

//                     <Menu {...bindMenu(popupState)}>
//                       <MenuItem
//                         onClick={(e) =>
//                           navigateToAddNewEntry(e, singleEvent.id)
//                         }
//                       >
//                         Add New Entry
//                       </MenuItem>
//                       <MenuItem onClick={(e) => editEvent(e, singleEvent.id)}>
//                         Edit Event
//                       </MenuItem>
//                       <MenuItem onClick={(e) => deleteEvent(e, singleEvent.id)}>
//                         Delete Event
//                       </MenuItem>
//                     </Menu>
//                   </React.Fragment>
//                 )}
//               </PopupState>
//             </>
//           )}
//         </>
//       ))}
//     </div>
//   );
// }

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Home.css";

const options = ["Add New Entry", "Edit Event", "Delete Event"];

const ITEM_HEIGHT = 48;

export default function MenuList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu-list">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Edit Event"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
