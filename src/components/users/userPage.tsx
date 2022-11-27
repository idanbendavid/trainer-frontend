import UserExercise from "./userExercises/userExercises";
import UserProfile from "./userProfile/userProfile";
import "./userPage.css";
import { Button } from "@mui/material";
import { useState } from "react";

function UserPage() {

  let [showPage, setShowPage] = useState(false);

  return (
    <>
      <div className="main-heading">
        <h1>Core2Fitness</h1>
        <p>your goals our mission</p>
      </div>

        <div className="switch-components-button">
          <Button variant="contained" onClick={() => setShowPage(!showPage)}>exercise / profile</Button>
        </div>
      <div className="user-page-component">
        {showPage &&
          <UserProfile />
        }
        {!showPage &&
          <UserExercise />
        }
      </div></>
  )
}

export default UserPage