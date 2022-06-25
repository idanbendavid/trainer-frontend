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

  function moveToLoginPage() {
    navigate("/login");
  }

  function showUsersTables() {
    navigate("admin/users")
  }

  function showUserProfile() {
    navigate("/profile");
  }

  function moveToHomePage() {
    navigate("/main")
  }

  function showPracticesTable() {
    navigate("admin/practices")
  }

  return (
    <div className='menu' >
      <div className='user-actions-in-menu'>
        <p>
          <span className='hello-span'>hello {user.firstName}</span>
          {!isLoggedIn &&
            <Button onClick={moveToLoginPage}>
              Login<LoginIcon fontSize='large' />
            </Button>
          }
          {isLoggedIn &&
            <Button onClick={logout}>
              Logout<LogoutIcon fontSize='large' />
            </Button>
          }
        </p>
        <MenuItem onClick={moveToHomePage}>
          <Home fontSize='large' />
          <span className='home-span'>home</span>
        </MenuItem>
        <br />
        {
          isLoggedIn && user.userRole === UserRole.Admin &&
          <div className='admin-menu-options'>
            <h4>users data</h4>
            <ul>
              <MenuItem onClick={showUsersTables}>signed users</MenuItem>
            </ul>
            <h4>practices data</h4>
            <ul>
              <MenuItem onClick={showPracticesTable}>offered practices</MenuItem>
            </ul>
          </div>
        }
        {
          isLoggedIn && user.userRole !== UserRole.Admin && user.userRole !== UserRole.Visitor &&
          <>
            <h4>user</h4>
            <ul>
              <MenuItem onClick={showUserProfile}>{user.firstName}'s profile</MenuItem>
              <MenuItem>{user.firstName}'s practices</MenuItem>
            </ul>
          </>
        }
        {isLoggedIn && user.userRole === UserRole.Coach &&
          <ul>
            <MenuItem>athletes practices</MenuItem>
          </ul>
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
    </div>
  );
}

