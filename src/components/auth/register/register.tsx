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
import regexes from '../../../helpers/regex';



export default function Register() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<IUser>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      userRole: UserRole.Athlete,
      email: "",
      password: ""
    }
  });

  let { connectedUser, message, isLoggedIn, isError, isSuccess } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<IUser> = async (registeredUser: IUser) => {
    if (!registeredUser.firstName) {
      setError("firstName", { type: "required", message: "Field Is Required" });
      setTimeout(() => {
        clearErrors("firstName");
      }, 2000);
      return;
    }
    if (!registeredUser.lastName) {
      setError("lastName", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("lastName")
      }, 2000);
      return;
    }
    if (!registeredUser.birthDate) {
      setError("birthDate", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("birthDate");
      }, 2000);
      return;
    }
    if (!registeredUser.userRole) {
      setError("userRole", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("userRole");
      }, 2000);
      return;
    }
    if (!registeredUser.email) {
      setError("email", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("email");
      }, 2000);
      return;
    }
    if (!registeredUser.email.match(regexes.emailReg)) {
      setError("email", { type: 'pattern', message: "Invalid Email Address" });
      setTimeout(() => {
        clearErrors("email");
      }, 2000);
      return;
    }
    if (!registeredUser.password) {
      setError("password", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("password");
      }, 2000);
      return;
    }
    if (!registeredUser.password.match(regexes.passwordReg)) {
      setError("password", { type: 'pattern', message: "at least 8 characters long\n1 uppercase letter\n1 lowercase letter\n1 number are required" })
      setTimeout(() => {
        clearErrors("password");
      }, 2000);
      return;
    }
    dispatch(serverRegistration(registeredUser));

    if(connectedUser){
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message)
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
            {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.firstName.message}</p>}
            <br /><br />
            <InputLabel>Last Name</InputLabel>
            <Input fullWidth type="text" {...register("lastName")} />
            {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.lastName.message}</p>}
            <br /><br />
            <InputLabel>Birth Date</InputLabel>
            <Input fullWidth type="date" {...register("birthDate")} />
            {errors.birthDate && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.birthDate.message}</p>}
            <br /><br />
            <label className='role-label' htmlFor="select">Role</label>
            <select {...register("userRole")}>
              <option value={UserRole.Athlete} >{UserRole.Athlete}</option>
            </select>
            {errors.userRole && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.userRole.message}</p>}
            <br /><br />
            <InputLabel>Email</InputLabel>
            <Input fullWidth type="email" {...register("email")} />
            {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.email.message}</p>}
            <br /><br />
            <InputLabel>Password</InputLabel>
            <Input fullWidth type="password" {...register("password")} />
            {errors.password && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.password.message}</p>}
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