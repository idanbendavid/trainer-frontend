import { Button, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../../store';
import { logout as logoutFromServer } from '../../../features/user/auth/authSlice';
import { resetUserExercise } from '../../../features/user/exercises/exerciseSlice';
import { resetExerciseNamesArray } from '../../../features/media/mediaSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Home } from '@mui/icons-material';
import './menu.css';
import { UserRole } from '../../../models/role';
import React from 'react';

export default function Menu(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let user = useAppSelector((state) => state.auth.connectedUser);
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  function logout(): void {
    dispatch(logoutFromServer());
    dispatch(resetUserExercise());
    dispatch(resetExerciseNamesArray());
    props.setIsMenuOpen(false);
    navigate("/welcome")
  }

  return (
    <div className='menu' >
      <div className='main-heading-menu'>
        <h1>Care2Fitness</h1>
        <p>your goals our mission</p>
      </div>
      <div className='user-actions-in-menu'>
        <p>
          <span className='hello-span'>hello {user.firstName}</span>
          {!isLoggedIn &&
            <Button onClick={() => { navigate("/login"); props.setIsMenuOpen(false) }}>
              Login<LoginIcon fontSize='large'/>
            </Button>
          }
          {isLoggedIn &&
            <Button onClick={logout}>
              Logout<LogoutIcon fontSize='large' />
            </Button>
          }
        </p>
        <MenuItem onClick={() => { navigate("/main"); props.setIsMenuOpen(false) }}>
          <Home fontSize='large' />
          <span className='home-span'>home</span>
        </MenuItem>
        <br />
        {
          isLoggedIn && user.userRole === UserRole.Admin &&
          <div className='admin-menu-options'>
            <h4>Admin</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/admin"); props.setIsMenuOpen(false) }}>dashboard</MenuItem>
            </ul>
          </div>
        }
        {
          isLoggedIn && user.userRole !== UserRole.Admin && 
          <>
            <h4>user</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/users"); props.setIsMenuOpen(false) }}>{user.firstName}'s profile</MenuItem>
            </ul>
          </>
        }
        <h4>gallery</h4>
        <ul className='gallery'>
          <MenuItem onClick={() => { navigate("/gallery"); props.setIsMenuOpen(false) }}>gallery</MenuItem>
        </ul>
        <h4>need help?</h4>
        <ul>
          <MenuItem onClick={() => { navigate("/contactUs"); props.setIsMenuOpen(false) }}>contact us</MenuItem>
        </ul>
        {!isLoggedIn &&
          <>
            <h4>Sign Up</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/register"); props.setIsMenuOpen(false); }}>register</MenuItem>
            </ul></>
        }
      </div>
    </div >
  );
}

