import "./login.css";
import { ILogin } from "../../../../models/ILogin"
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button/Button";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../features/auth/authSlice";
import { AppDispatch, useAppSelector } from "../../../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { UserRole } from "../../../../models/role";
import { changeUserPassword, checkEmailBeforePasswordChange, resetUserData } from "../../../../features/auth/authSlice";
import regexes from "../../../../helpers/regex";

export default function LoginPage() {

  const dispatch = useDispatch<AppDispatch>();

  const [forgotPasswordModal, setForgotPasswordModal] = useState(Boolean);
  const [showNewPasswordSelectionDiv, setShowNewPasswordSelectionDiv] = useState(Boolean);
  const [checkEmail, setCheckEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  const navigate = useNavigate();

  let { connectedUser, message, isLoggedIn, isError, isSuccess } = useAppSelector((state) => state.auth)
  let checkEmailResult: string = useAppSelector((state) => state.auth.connectedUser.email);

  const { control, handleSubmit, setError, formState: { errors }, clearErrors } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<ILogin> = (loginData: ILogin) => {

    let loginValidation = loginFormValidation(loginData);

    if (loginValidation) {
      dispatch(login(loginData))
    }
  };

  function loginFormValidation(loginData: ILogin): boolean {
    if (!loginData.email) {
      setError("email", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("email")
      }, 2000);
      return false;
    }
    if (!loginData.password) {
      setError("password", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("password")
      }, 2000);
      return false;
    }
    if (!loginData.email.match(regexes.emailReg)) {
      setError("email", { type: "pattern", message: "Invalid Email Address" })
      setTimeout(() => {
        clearErrors("email")
      }, 2000);
      return false;
    }
    if (!loginData.password.match(regexes.passwordReg)) {
      setError("password", { type: "pattern", message: "password must include al least 8 characters, must contain 1 uppercase letter 1 lowercase letter and 1 number" })
      setTimeout(() => {
        clearErrors("password")
      }, 2000);
      return false;
    }
    return true
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isLoggedIn && connectedUser.userRole === UserRole.Admin) {
      navigate("/admin")
    }

    else if (isLoggedIn) {
      navigate("/users")
    }

    if (checkEmailResult) {
      setShowNewPasswordSelectionDiv(true);
    }

  }, [connectedUser, message, isError, isLoggedIn, isSuccess, dispatch, navigate, checkEmailResult])

  const forgotPasswordHandleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckEmail(event.target.value);
  }

  function closeForgotPasswordModal() {
    setForgotPasswordModal(false)
    dispatch(resetUserData())
    setShowNewPasswordSelectionDiv(false);
  }

  const forgotPasswordModalHandleNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }

  const forgotPasswordModalHandleNewPasswordVerification = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckNewPassword(event.target.value)
  }

  async function updatePassword() {
    if (!newPassword.match(regexes.passwordReg)) {
      toast.error("at least 8 characters long, 1 uppercase letter 1 lowercase letter and 1 number are required");
      return;
    }
    if (newPassword !== checkNewPassword) {
      toast.error('values do not match');
      return;
    }
    dispatch(await changeUserPassword(newPassword, checkEmailResult))
  }


  return (
    <div className="login-page">
      <div className="main-heading main-heading-auth">
        <h1>Core2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5" color={'white'} zIndex={999} >Sign In</Typography>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <Controller name="email" control={control} defaultValue="" render={({ field }) => <Input name='email' type="email" fullWidth {...field} />} />
            {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', position:'relative', fontSize:'20px' }}>{errors.email.message}</p>}
            <br /><br />
            <label>Password</label>
            <Controller name="password" control={control} defaultValue="" render={({ field }) => <Input name="password" type="password" fullWidth {...field} />} />
            {errors.password && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', position:'relative', fontSize:'20px' }}>{errors.password.message}</p>}
            <br /><br />
            <div className="button">
              <Button type="submit" variant="contained">Sign In</Button>
            </div>
          </form>
          <br />
          <div className="login-page-bottom-section">
            <Button variant="contained" color="error" id="forgotPassword" onClick={() => setForgotPasswordModal(true)}>Forgot Password</Button>
            <Button variant="contained" color="success" id="signUpLink" onClick={()=> navigate("/register")}>Sign up now</Button>
          </div>
        </Box>
      </Container>
      <Dialog open={forgotPasswordModal} onClose={closeForgotPasswordModal} >
        <DialogTitle >
          <div className="forgot-password-modal-title">
            <Button color="error" variant='contained' onClick={() => setForgotPasswordModal(false)}>X</Button>
            Forgot Password
          </div>
        </DialogTitle>
        <DialogContent>
          {!showNewPasswordSelectionDiv &&
            <div >
              Enter your email address
              <Input id="email" className="forgot-password-email-input" placeholder="Email Address" type="email" fullWidth={true} onChange={forgotPasswordHandleEmailChange} />
            </div>
          }
          {showNewPasswordSelectionDiv &&
            <div>
              Select new password
              <Input placeholder="new password" type="password" fullWidth onChange={forgotPasswordModalHandleNewPassword} />
              <br /><br />
              Verify new password
              <Input placeholder="verify password" type="password" fullWidth onChange={forgotPasswordModalHandleNewPasswordVerification} />
            </div>
          }
        </DialogContent>
        <DialogActions>
          {!showNewPasswordSelectionDiv &&
            <Button onClick={() => dispatch(checkEmailBeforePasswordChange(checkEmail))}>Check Email Validaty</Button>
          }
          {showNewPasswordSelectionDiv &&
            <Button onClick={updatePassword}>Update Password</Button>
          }
        </DialogActions>
      </Dialog>
    </div >
  )
}

