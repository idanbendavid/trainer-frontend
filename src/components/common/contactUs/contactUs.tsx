import { Container, CssBaseline, Box } from "@mui/material";
import "./contactUs.css";
import FormComponents from "../form/formComponents";


function ContactUs() {

  return (
    <>
      <div className="main-heading">
        <h1>Core2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <div className="contact-us-page">
        <Container component="form" maxWidth="md">
          <CssBaseline />
          <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>need help? having a problem?</h1>
            <h3>please provide us a full description and our team will help you overcome it</h3>
            <FormComponents />
          </Box>
        </Container>
      </div></>
  )
}

export default ContactUs