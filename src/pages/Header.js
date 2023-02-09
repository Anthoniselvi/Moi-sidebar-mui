import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useSearchParams } from "react-router-dom";
// import "./Home.css";
import "./style.css";
import { useUserAuth } from "../Context/UserAuthContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header(props) {
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

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
    navigate(`/profile?profile=${profileId}`);
  };

  const navigateToNewEvent = () => {
    navigate(`/event/new?profile=${profileId}`);
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
    // <div >
    <Box sx={{ flexGrow: 1 }} className="header_container">
      <AppBar position="static" sx={{ backgroundColor: "#ffbe0b" }}>
        <Toolbar className="header-tool">
          {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="head-line"
          >
            Moi App
          </Typography>
          <div className="head-body">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircle style={{ fontSize: "30px" }} />
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.name}
            </Typography>
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
              {/* <MenuItem onClick={navigateToNewEvent}>My account</MenuItem> */}

              {!user ? (
                <MenuItem onClick={navigateToSignIn}>LogIn</MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    // </div>
  );
}
