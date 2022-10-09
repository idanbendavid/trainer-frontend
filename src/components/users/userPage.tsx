import UserExercise from "./userExercises/userExercises";
import UserProfile from "./userProfile/userProfile";
import "./userPage.css";

function UserPage() {
  return (
    <div className="user-page-component">
        <UserProfile/>
        <UserExercise/>
    </div>
  )
}

export default UserPage