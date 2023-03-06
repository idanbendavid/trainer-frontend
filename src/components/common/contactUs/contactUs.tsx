import { Container, CssBaseline, Box } from "@mui/material";
import "./contactUs.css";
import ComplaintFormComponents from "../forms/complaintForm/complaintFormComponent";


function ContactUs() {

  return (
    <>
      <div className="main-heading">
        <h1>Care2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <div className="contact-us-page">
        <Container component="form" maxWidth="md">
          <CssBaseline />
          <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
            <h1 id="helpHeading">need help? having a problem?</h1>
            <h3 id="helpSecondHeading">please provide us a full description and our team will help you overcome it</h3>
            <ComplaintFormComponents />
          </Box>
        </Container>
      </div></>
  )
}

export default ContactUs