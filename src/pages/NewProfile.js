import React, { useState } from "react";
import sqlite3 from "sqlite3";

function NewProfile() {
  const [userData, setUserData] = useState({});

  // Connect to the database and fetch the current user's data
  //   const db = new sqlite3.Database("path/to/database.sqlite");
  let db = new sqlite3.Database("Storage/db/events");
  db.get("SELECT * FROM users WHERE id = ?", [currentUserId], (err, row) => {
    if (err) {
      console.error(err);
    } else {
      setUserData(row);
    }
  });

  // Render the user's profile data
  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
}

export default NewProfile;
