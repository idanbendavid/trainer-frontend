import "./login.css";
import { ILogin } from "../../../models/ILogin"
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Avatar, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button/Button";
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import { useAppSelector } from "../../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { UserRole } from "../../../models/role";
import { changeUserPassword, checkEmailBeforePasswordChange, resetUserData } from "../../../features/userData/userDataSlice";

export default function LoginPage() {

  const dispatch = useDispatch();

  const [forgotPasswordModal, setForgotPasswordModal] = useState(Boolean);
  const [showNewPasswordSelectionDiv, setShowNewPasswordSelectionDiv] = useState(Boolean);
  const [checkEmail, setCheckEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  const navigate = useNavigate();

  let { connectedUser, message, isLoggedIn, isError, isSuccess } = useAppSelector((state) => state.auth)
  let checkEmailResult: string = useAppSelector((state) => state.user.user.email);

  const { control, handleSubmit } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (loginData: ILogin) => {
    dispatch(login(loginData))
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isLoggedIn && connectedUser.userRole === UserRole.Admin) {
      navigate("/admin")
    }

    else if (isLoggedIn) {
      navigate("/profile")
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

  function updatePassword() {
    if (newPassword === checkNewPassword) {
      dispatch(changeUserPassword(newPassword, checkEmailResult))
    }
    toast.error('values do not match')
  }


  return (
    <div className="login-page">
      <CssBaseline />
      <Container fixed>
        <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <Controller name="email" control={control} defaultValue="" rules={{ required: true }} render={({ field }) => <Input name='email' type="email" fullWidth required {...field} />} />
            <br /><br />
            <label>Password</label>
            <Controller name="password" control={control} rules={{ required: true }} defaultValue=""  render={({ field }) => <Input name="password" type="password" fullWidth required {...field} />} />
            <br /><br />
            <div className="button">
              <Button type="submit" variant="contained">Login</Button>
            </div>
          </form>
          <br />
          <div>
            <Link to="/register" className="sign-up-link">Sign up now</Link>
            <Button variant="text" color="error" onClick={() => setForgotPasswordModal(true)}>Forgot Password</Button>
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

