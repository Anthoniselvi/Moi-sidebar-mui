// import "./App.css";
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect, useRef } from "react";

function MenuList() {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <ul>
          <DropdownItem text={"Add New Entry"} />
          <DropdownItem text={"Edit Event"} />
          <DropdownItem text={"Delete Event"} />
        </ul>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      {/* <img src={props.img}></img> */}
      <a> {props.text} </a>
    </li>
  );
}

export default MenuList;
