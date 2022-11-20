import "./landingPage.css";
import workout from "../../../assets/images/anastase-maragos-YVz1LxVJqoA-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


function LandingPage() {

  const navigate = useNavigate();


  return (
    <div className="landing-page container-fluid">
      <img src={workout} alt="workout" className="landing-page-image" />
      <Button variant="contained" color="primary" className="login-navigation" onClick={() => navigate("/login")}>Sign In</Button >
      <div className="brand">
        <h1>Core2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <h2 className="mind-playing">
        it's sould have been you
        <br /> join the revolution now!
      </h2>
      <div className="motivation">
        <h2 className="bubble bubble-bottom-left"> hard work dedication never quiting now you're looking at a champion!</h2>
      </div>
      <button className="join-button" onClick={() => navigate("/register")}>start your juorney now!</button>
    </div>
  )
}

export default LandingPage