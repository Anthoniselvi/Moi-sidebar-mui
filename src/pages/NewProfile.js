import React, { useState } from "react";
import sqlite3 from "sqlite3";

function NewProfile() {
  const [userData, setUserData] = useState({});

  // Render the user's profile data
  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
}

export default NewProfile;
