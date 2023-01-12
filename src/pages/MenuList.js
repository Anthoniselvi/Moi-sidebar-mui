import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Home.css";

export default function MenuList() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            <MoreVertIcon className="more-icon" />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Add New Entry</MenuItem>
            <MenuItem onClick={popupState.close}>Edit Event</MenuItem>
            <MenuItem onClick={popupState.close}>Delete Event</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
