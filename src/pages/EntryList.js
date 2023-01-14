import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

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
import EditIcon from "@mui/icons-material/Edit";

export default function EntriesList(props) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const [entries, setEntries] = useState([]);

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

  // const navigateToEntryForm = () => {
  //   navigate(`/entry/new?event=${eventId}`);
  // };

  const moveToEventListPage = () => {
    navigate("/eventslist");
  };

  const editEntry = (id) => {
    navigate(`/edit?entry=${id}`);
  };

  const deleteEntry = (e, id) => {
    e.stopPropagation();
    const entryArray = entries.filter((item) => {
      return item.id !== id;
    });
    setEntries(entryArray);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2023/entries/all/${eventId}`)
      .then((response) => {
        console.log(eventId);
        console.log(response);
        console.log(response.data);
        setEntries(response.data);
      });
  }, []);

  return (
    <div className="entry_container">
      <h1 className="entry-title">Entry List</h1>
      <div className="entry_content">
        <div className="entry-inner-box">
          <div className="entry_searchbar">
            <BiSearch style={{ fontSize: "20px" }} />
            <input
              type="text"
              placeholder="Search by Person Name"
              className="entry_searchbar_input"
              // value={searchName}
              onChange={onChangeHandle}
            />
          </div>
          {entries.length > 0 && (
            <>
              <table className="entry-table">
                <thead>
                  <tr>
                    <th>Person Name</th>
                    <th>Amount (Rs.)</th>
                    <th>Gift</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <Avatar
                          name={entry.personName}
                          size="35"
                          round={true}
                          maxInitials="1"
                        />
                        {entry.personName}
                      </td>
                      <td>{entry.amount}</td>
                      <td>{entry.gift}</td>
                      <td>
                        <AiFillEdit onClick={() => editEntry(entry.id)} />
                        {/* <Button
                          onClick={() => editEntry(entry.id)}
                          variant="outlined"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button> */}
                      </td>
                      <td>
                        <MdDelete onClick={() => deleteEntry(entry.id)} />
                        {/* <Button
                          onClick={() => deleteEntry(entry.id)}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button> */}
                      </td>
                    </tr>
                  ))}

                  <tr className="total-entry">
                    <td>Total</td>
                    <td>{totalAmount}</td>
                    <td>{totalGift}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>

        {entries.length < 1 && (
          <>
            <p className="no-text">No Entries found</p>

            <button className="addevent-button" onClick={navigateToAddNewEntry}>
              Add New Entry
            </button>
          </>
        )}
      </div>
      <Box sx={{ "& > :not(style)": { m: 1 } }} className="plus-icon">
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={navigateToAddNewEntry} />
        </Fab>
      </Box>
    </div>
  );
}