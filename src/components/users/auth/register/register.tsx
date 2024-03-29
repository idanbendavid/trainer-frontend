import { IUser } from '../../../../models/User';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import './register.css';
import { Container, CssBaseline, Box, Avatar, Typography, Button, Grid, Input, InputLabel, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register as serverRegistration } from '../../../../features/user/auth/authSlice';
import { AppDispatch } from '../../../../store';
import regexes from '../../../../helpers/regex';
import React, { useEffect, useState } from 'react';



export default function Register() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [openExerciseModal, setOpenExerciseModal] = useState(false);

  const { register, handleSubmit, setError, clearErrors, formState: { errors }, resetField } = useForm<IUser>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<IUser> = async (registeredUser: IUser) => {

    let formValidation = registerFormValidation(registeredUser);

    if (formValidation) {

      let registerRes = await dispatch(serverRegistration(registeredUser))

      if (typeof registerRes.payload !== 'string') {
        navigate("/users");
      }
    }

  };

  function registerFormValidation(registeredUser: IUser): boolean {
    if (!registeredUser.firstName) {
      setError("firstName", { type: "required", message: "Field Is Required" });
      setTimeout(() => {
        clearErrors("firstName");
      }, 2000);
      return false;
    }
    if (!registeredUser.lastName) {
      setError("lastName", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("lastName")
      }, 2000);
      return false;
    }
    if (!registeredUser.birthDate) {
      setError("birthDate", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("birthDate");
      }, 2000);
      return false;
    }
    if (!registeredUser.email) {
      setError("email", { type: "required", message: "Field Is Required" })
      resetField("email");
      setTimeout(() => {
        clearErrors("email");
      }, 2000);
      return false;
    }
    if (!registeredUser.email.match(regexes.emailReg)) {
      setError("email", { type: 'pattern', message: "Invalid Email Address" });
      setTimeout(() => {
        clearErrors("email");
      }, 2000);
      return false;
    }
    if (!registeredUser.password) {
      setError("password", { type: "required", message: "Field Is Required" })
      setTimeout(() => {
        clearErrors("password");
      }, 2000);
      return false;
    }
    if (!registeredUser.password.match(regexes.passwordReg)) {
      setError("password", { type: 'pattern', message: "at least 8 characters long\n1 uppercase letter\n1 lowercase letter\n1 number are required" })
      setTimeout(() => {
        clearErrors("password");
      }, 2000);
      return false;
    }
    return true;
  }

  useEffect(() => {
    setOpenExerciseModal(true);
  }, [setOpenExerciseModal])

  return (
    <>
      {openExerciseModal &&
        <Dialog open={openExerciseModal}>
          <DialogTitle className='warning-dialog-titles'>
            <h1>Warning!</h1>
            <div className='close-dialog'>
              <Button onClick={() => setOpenExerciseModal(false)} variant='contained' color='error'>X</Button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className='warning-dialog-content'>
              <p>This Is An Experimental Website!</p>
              <h3>DO NOT ENTER REAL CREDENTIALS AS THEY WILL NOT BE SECURED IN A PROPER WAY!</h3>
            </div>
          </DialogContent>
        </Dialog >}
      <div className="register">
        <div className="main-heading main-heading-auth">
          <h1>Care2Fitness</h1>
          <p>your goals our mission</p>
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', color: 'white' }} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>Sign up</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel sx={{ color: 'white' }}>First Name</InputLabel>
              <Input fullWidth type="text" {...register("firstName")} />
              {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.firstName.message}</p>}
              <br /><br />
              <InputLabel sx={{ color: 'white' }}>Last Name</InputLabel>
              <Input fullWidth type="text" {...register("lastName")} />
              {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.lastName.message}</p>}
              <br /><br />
              <InputLabel sx={{ color: 'white' }}>Birth Date</InputLabel>
              <Input fullWidth type="date" {...register("birthDate")} />
              {errors.birthDate && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.birthDate.message}</p>}
              <br /><br />
              <InputLabel sx={{ color: 'white' }}>Email</InputLabel>
              <Input fullWidth type="email" {...register("email")} />
              {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.email.message}</p>}
              <br /><br />
              <InputLabel sx={{ color: 'white' }}>Password</InputLabel>
              <Input fullWidth type="password" {...register("password")} />
              {errors.password && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.password.message}</p>}
              <div className='regsiter-button'>
                <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }} > Sign Up </Button>
              </div>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to='/login' style={{ color: 'blue' }}> Already have an account? Sign in now </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </div >
    </>
  )
}