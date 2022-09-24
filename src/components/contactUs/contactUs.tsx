import { Container, CssBaseline, Box, Button, InputLabel } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import InputUnstyled from '@mui/base/InputUnstyled';
import "./contactUs.css";
import { useAppSelector } from "../../store";
import publicComplatinsService from "../../services/publicComplaints";
import { toast } from "react-toastify";
import regexes from "../../helpers/regex";


function ContactUs() {

  let userDetails = useAppSelector((state) => state.auth.connectedUser);

  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm<any>({
    defaultValues: {
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      email: userDetails.email || "",
      complaintCategory: "",
      description: ""
    }
  });

  const onProblemFormSubmit: SubmitHandler<any> = async (userComplaint) => {
    if (!userComplaint.firstName) {
      setError("firstName", { type: 'required', message: "field is required" })
      setTimeout(() => {
        clearErrors("firstName")
      }, 1500);
      return;
    }
    if (!userComplaint.lastName) {
      setError("lastName", { type: 'required', message: "field is required" })
      setTimeout(() => {
        clearErrors("lastName")
      }, 1500);
      return;
    }
    if (!userComplaint.email) {
      setError("email", { type: 'required', message: "field is required" })
      setTimeout(() => {
        clearErrors("email")
      }, 1500);
      return;
    }
    if (!userComplaint.email.match(regexes.emailReg)) {
      setError("email", { type: 'pattern', message: "Invalid Email Address" })
      setTimeout(() => {
        clearErrors("email")
      }, 1500);
      return;
    }
    if (!userComplaint.complaintCategory) {
      setError("complaintCategory", { type: 'required', message: "field is required" })
      setTimeout(() => {
        clearErrors("complaintCategory")
      }, 1500);
      return;
    }
    if (!userComplaint.description) {
      setError("description", { type: 'required', message: "field is required" })
      setTimeout(() => {
        clearErrors("description")
      }, 1500);
      return;
    }
    else {
      const response = await publicComplatinsService.newComplaint(userComplaint)
      if (response) {
        toast.info("your complaint has been recieved")
      }
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
                {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.firstName.message}</p>}
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel>last Name</InputLabel>
                <InputUnstyled type="text" value={userDetails.lastName} {...register("lastName")}></InputUnstyled>
                {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.lastName.message}</p>}
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel id="emailLabelInput">email</InputLabel>
                <InputUnstyled type="email" value={userDetails.email} {...register("email")}></InputUnstyled>
                {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.email.message}</p>}
              </div>
            </>
          }
          {!isLoggedIn &&
            <>
              <div className="contact-us-form-inputs">
                <InputLabel>First Name</InputLabel>
                <InputUnstyled type="text" placeholder="Enter First Name" {...register("firstName")}>Enter First Name</InputUnstyled>
                {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.firstName.message}</p>}
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel>last Name</InputLabel>
                <InputUnstyled type="text" placeholder="Enter Last Name" {...register("lastName")}>Enter Last Name</InputUnstyled>
                {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.lastName.message}</p>}
              </div>
              <br />
              <div className="contact-us-form-inputs">
                <InputLabel id="emailLabelInput">email</InputLabel>
                <InputUnstyled type="email" placeholder="Enter Your Email" {...register("email")}>Enter Your Email</InputUnstyled>
                {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.email.message}</p>}
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
            <br />
            {errors.complaintCategory && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.complaintCategory.message}</p>}
          </div>
          <br />
          <textarea className="problem-text-area" placeholder="please describe your problem" {...register("description")} ></textarea>
          {errors.description && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.description.message}</p>}
          <br />
          <Button variant="contained" onClick={handleSubmit(onProblemFormSubmit)}>submit</Button>
        </Box>
      </Container>

    </div>
  )
}

export default ContactUs