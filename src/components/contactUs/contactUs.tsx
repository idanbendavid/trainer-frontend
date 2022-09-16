import { Container, CssBaseline, Box, Button, InputLabel } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import InputUnstyled from '@mui/base/InputUnstyled';
import "./contactUs.css";
import { useAppSelector } from "../../store";
import publicComplatinsService from "../../services/publicComplaints";
import { toast } from "react-toastify";


function ContactUs() {

  let userDetails = useAppSelector((state) => state.auth.connectedUser);

  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const { register, handleSubmit } = useForm<any>();

  const onProblemFormSubmit: SubmitHandler<any> = async (userComplaint) => {
    const response = await publicComplatinsService.newComplaint(userComplaint)
    if(response){
      toast.info("your complaint has been recieved")
    }
  };

  return (
    <div className="contact-us-page">
      <Container component="form" maxWidth="md">
        <CssBaseline />
        <Box sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <h1>need help? having a problem?</h1>
          <h3>please provide us a full description and our team will help you overcome it</h3>
          {isLoggedIn &&
            <>
              <div className="contact-us-form-inputs">
                <InputLabel>First Name</InputLabel>
                <InputUnstyled type="text" value={userDetails.firstName} {...register("firstName")}></InputUnstyled>
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel>last Name</InputLabel>
                <InputUnstyled type="text" value={userDetails.lastName} {...register("lastName")}></InputUnstyled>
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel id="emailLabelInput">email</InputLabel>
                <InputUnstyled type="email" value={userDetails.email} {...register("email")}></InputUnstyled>
              </div>
            </>
          }
          {!isLoggedIn &&
            <>
              <div className="contact-us-form-inputs">
                <InputLabel>First Name</InputLabel>
                <InputUnstyled type="text" placeholder="Enter First Name" {...register("firstName")}>Enter First Name</InputUnstyled>
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel>last Name</InputLabel>
                <InputUnstyled type="text" placeholder="Enter Last Name" {...register("lastName")}>Enter Last Name</InputUnstyled>
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel id="emailLabelInput">email</InputLabel>
                <InputUnstyled type="email" placeholder="Enter Your Email" {...register("email")}>Enter Your Email</InputUnstyled>
              </div>
            </>
          }
          <br />
          <div className="contact-us-select-and-option-div">
            <InputLabel htmlFor="select" id="select-label">category</InputLabel>
            <select className="contact-us-select" {...register("complaintCategory")}>
              <option>articles</option>
              <option>exercises</option>
              <option>profile</option>
              <option>Gallery</option>
              <option>Other</option>
            </select>
          </div>
          <br />
          <textarea className="problem-text-area" placeholder="please describe your problem" {...register("description")} ></textarea>
          <br />
          <Button variant="contained" onClick={handleSubmit(onProblemFormSubmit)}>submit</Button>
        </Box>
      </Container>

    </div>
  )
}

export default ContactUs