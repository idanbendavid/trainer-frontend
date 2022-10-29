import { Button, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../../store';
import { logout as logoutFromServer } from '../../../features/auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Home } from '@mui/icons-material';
import './menu.css';
import { UserRole } from '../../../models/role';

export default function Menu(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let user = useAppSelector((state) => state.auth.connectedUser);
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  function logout() {
    dispatch(logoutFromServer());
    props.closeMenu();
    navigate("/welcome")
  }

  return (
    <div className='menu' >
      <div className='user-actions-in-menu'>
        <p>
          <span className='hello-span'>hello {user.firstName}</span>
          {!isLoggedIn &&
            <Button onClick={() => { navigate("/login"); props.closeMenu() }}>
              Login<LoginIcon fontSize='large' />
            </Button>
          }
          {isLoggedIn &&
            <Button onClick={logout}>
              Logout<LogoutIcon fontSize='large' />
            </Button>
          }
        </p>
        <MenuItem onClick={() => { navigate("/main"); props.closeMenu() }}>
          <Home fontSize='large' />
          <span className='home-span'>home</span>
        </MenuItem>
        <br />
        {
          isLoggedIn && user.userRole === UserRole.Admin &&
          <div className='admin-menu-options'>
            <h4>Admin</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/admin"); props.closeMenu() }}>dashbord</MenuItem>
            </ul>
          </div>
        }
        {
          isLoggedIn && user.userRole !== UserRole.Admin && user.userRole !== UserRole.Visitor &&
          <>
            <h4>user</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/users"); props.closeMenu() }}>{user.firstName}'s profile</MenuItem>
            </ul>
          </>
        }
        <h4>gallery</h4>
        <ul className='gallery'>
          <MenuItem onClick={() => { navigate("/gallery"); props.closeMenu() }}>gallery</MenuItem>
        </ul>

        <h4>need help?</h4>
        <ul>
          <MenuItem onClick={() => { navigate("/*"); props.closeMenu() }}>contact us</MenuItem>
        </ul>
        {!isLoggedIn &&
          <>
            <h4>Sign Up</h4>
            <ul>
              <MenuItem onClick={() => { navigate("/register"); props.closeMenu(); }}>register</MenuItem>
            </ul></>
        }
      </div>
    </div >
  );
}

