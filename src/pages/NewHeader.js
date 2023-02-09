import * as React from "react";
// import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import "../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";

export default function NewHeader() {
  //   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();

  const open = Boolean(anchorEl);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const navigateToProfile = () => {
    // navigate("/profile");
    navigate(`/profile?profile=${profileId}`);
  };

  const navigateToNewEvent = () => {
    // navigate(`/event/new?profile=${profileId}`);
  };
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header_container">
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Moi App
          </Typography>
          {/* {auth && ( */}
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
              <MenuItem onClick={navigateToSignIn}>Login</MenuItem>
              {/* <MenuItem onClick={navigateToNewEvent}>My account</MenuItem> */}

              {/* {!user ? (
                <MenuItem onClick={navigateToSignIn}>Login</MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )} */}
            </Menu>
          </div>
          {/* )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
