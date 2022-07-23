import { Button, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { logout as logoutFromServer } from '../../features/auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Home } from '@mui/icons-material';
import './menu.css';
import { UserRole } from '../../models/role';

export default function Menu() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useAppSelector((state) => state.auth.connectedUser);
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  function logout() {
    dispatch(logoutFromServer());
    navigate("/main")
  }

  return (
    <div className='menu' >
      <div className='user-actions-in-menu'>
        <p>
          <span className='hello-span'>hello {user.firstName}</span>
          {!isLoggedIn &&
            <Button onClick={() => navigate("/login")}>
              Login<LoginIcon fontSize='large' />
            </Button>
          }
          {isLoggedIn &&
            <Button onClick={logout}>
              Logout<LogoutIcon fontSize='large' />
            </Button>
          }
        </p>
        <MenuItem onClick={() => navigate("/main")}>
          <Home fontSize='large' />
          <span className='home-span'>home</span>
        </MenuItem>
        <br />
        {
          isLoggedIn && user.userRole === UserRole.Admin &&
          <div className='admin-menu-options'>
            <h4>users data</h4>
            <ul>
              <MenuItem onClick={() => navigate("admin/users")}>signed users</MenuItem>
            </ul>
          </div>
        }
        {
          isLoggedIn && user.userRole !== UserRole.Admin && user.userRole !== UserRole.Visitor &&
          <>
            <h4>user</h4>
            <ul>
              <MenuItem onClick={() => navigate("/profile")}>{user.firstName}'s profile</MenuItem>
              <MenuItem onClick={() => navigate("/userExercises")}>{user.firstName}'s exercises</MenuItem>
            </ul>
          </>
        }
        {isLoggedIn &&
          <>
            <h4>gallery</h4>
            <ul className='gallery'>
              <MenuItem>gallery</MenuItem>
            </ul>
          </>
        }
      </div>
    </div >
  );
}

