import UserProfile from "./userProfile/userProfile";
import "./userPage.css";
import UserExercises from "./userExercises/userExercises";
import { Button, Container } from "@mui/material";
import React, { useState } from "react";

function UserPage() {

  return (
    <>
      <div className="main-heading">
        <h1>Care2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <Container maxWidth='xl'>
          <div className="user-page-component big-screen">
            <UserProfile />
            <UserExercises />
          </div>
      </Container>
    </>
  )
}

export default UserPage