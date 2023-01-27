import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Home.css";
import { useUserAuth } from "../Context/UserAuthContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header() {
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");

  const handleClick = (event) => {
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
    navigate(`/profile?id=${profileId}`);
  };

  const navigateToNewEvent = () => {
    navigate("/event/new");
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
    <div className="header-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#ffbe0b" }}>
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
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </Button>
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
              <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
              <MenuItem onClick={navigateToNewEvent}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Moi App
            </Typography>

            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.name}
            </Typography> */}
            {!user ? (
              <Button color="inherit" onClick={navigateToSignIn}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
