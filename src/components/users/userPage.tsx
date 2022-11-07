import UserExercise from "./userExercises/userExercises";
import UserProfile from "./userProfile/userProfile";
import "./userPage.css";

function UserPage() {
  return (
    <>
      <div className="main-heading">
        <h1>Core2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <div className="user-page-component">
        <UserProfile />
        <UserExercise />
      </div></>
  )
}

export default UserPage