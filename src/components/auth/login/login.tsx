import "./login.css";
import { ILogin } from "../../../models/ILogin"
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Avatar, Container, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button/Button";
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import { useAppSelector } from "../../../store";
import { useEffect } from "react";
import { UserRole } from "../../../models/role";

export default function LoginPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let { connectedUser, message, isLoggedIn, isError, isSuccess } = useAppSelector((state) => state.auth)

  const { control, handleSubmit } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (loginData: ILogin) => {
    dispatch(login(loginData))
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isLoggedIn && connectedUser.userRole === UserRole.Admin) {
      navigate("/admin/users")
    }

    else if (isLoggedIn) {
      navigate("/profile")
    }

  }, [connectedUser, message, isError, isLoggedIn, isSuccess, dispatch, navigate])

  return (
    <div className="login-page">
      <CssBaseline />
      <Container fixed>
        <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <Controller name="email" control={control} defaultValue="" render={({ field }) => <Input type="email" fullWidth required {...field} />} />
            <br /><br />
            <label>Password</label>
            <Controller name="password" control={control} defaultValue="" render={({ field }) => <Input type="password" fullWidth required {...field} />} />
            <br /><br />
            <div className="button">
              <Button type="submit" variant="contained">Log In</Button>
            </div>
          </form>
          <br />
          <Link to="/register">don't have an account? sign up now</Link>
        </Box>
      </Container>
    </div >
  )
}

