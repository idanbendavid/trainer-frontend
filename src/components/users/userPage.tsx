import UserProfile from "./userProfile/userProfile";
import "./userPage.css";
import UserExercises from "./userExercises/userExercises";
import { Container } from "@mui/material";

function UserPage() {


  return (
    <>
      <div className="main-heading">
        <h1>Care2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <Container maxWidth='xl'>
        <div className="user-page-component">
          <UserProfile />
          <UserExercises />
        </div>
      </Container>
    </>
  )
}

export default UserPage