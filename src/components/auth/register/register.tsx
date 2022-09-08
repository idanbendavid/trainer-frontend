import { useEffect } from 'react';
import { IUser } from '../../../models/IUser';
import { UserRole } from '../../../models/role';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import './register.css';
import { toast } from "react-toastify"
import { Container, CssBaseline, Box, Avatar, Typography, Button, Grid, Input, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register as serverRegistration } from '../../../features/auth/authSlice';
import { AppDispatch, useAppSelector } from '../../../store';



export default function Register() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // line 21 register is from the use form hook and means connecting to the inputs
  const { register, handleSubmit } = useForm<IUser>();
  // line 21 register is from the use form hook and means connecting to the inputs

  let { connectedUser, message, isLoggedIn, isError, isSuccess } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<IUser> = async (registeredUser: IUser) => {
    // add validation to form fields
    dispatch(serverRegistration(registeredUser))
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (connectedUser.userRole === UserRole.Admin && isSuccess) {
      navigate("/admin/users")
    }

  }, [connectedUser, message, isError, isLoggedIn, isSuccess, dispatch, navigate])

  return (
    <div className="register">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>Sign up</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel>First Name</InputLabel>
            <Input fullWidth type="text" {...register("firstName")} />
            <br /><br />
            <InputLabel>Last Name</InputLabel>
            <Input fullWidth type="text" {...register("lastName")} />
            <br /><br />
            <InputLabel>Birth Date</InputLabel>
            <Input fullWidth type="date" {...register("birthDate")} />
            <br /><br />
            <label className='role-label' htmlFor="select">Role</label>
            <select {...register("userRole")}>
              <option value={UserRole.Athlete} defaultChecked>{UserRole.Athlete}</option>
            </select>
            <br /><br />
            <InputLabel>Email</InputLabel>
            <Input fullWidth type="email" {...register("email")} />
            <br /><br />
            <InputLabel>Password</InputLabel>
            <Input fullWidth type="password" {...register("password")} />
            <div className='regsiter-button'>
              <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }} > Sign Up </Button>
            </div>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to='/login'> Already have an account? Sign in now </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div >
  )
}