import './layout.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../auth/login/login';
import Register from '../auth/register/register';
import Main from '../main/main';
import UserProfile from '../users/userProfile/userProfile';
import { remainConnceted } from '../../features/auth/authSlice';
import Menu from '../menu/menu';
import ContactUs from '../contactUs/contactUs';
import UsersListAdmin from '../admin/usersListAdmin/userListAdmin';
import ExerciseCard from '../exerciseCard/exerciseCard';


function Layout() {

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      console.log("refreshed")
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(remainConnceted())
    }
    else {
      console.log("no token")
      navigate("/main")
    }
  }, [dispatch]);

  return (
    <div className="layout container-fluid">
      <>
        {
          <nav style={{ display: isOpen ? 'initial' : 'none' }}>
            <Menu />
          </nav>
        }
      </>
      <section>
        <Button onClick={() => setIsOpen(!isOpen)} id="menuButton">
          {!isOpen &&
            <MenuIcon fontSize='large' id="menuIcon" />
          }
          {isOpen &&
            <CloseIcon fontSize='large' id="closeMenuIcon" />
          }
        </Button>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace={true} />} />
          {/* public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/exerciseCard" element={<ExerciseCard id={0} name={''} bodyPart={''} equipment={''} target={''} gifUrl={''} />} />
          <Route path="/*" element={<ContactUs />} />

          {/* private admin routes */}
          <Route path="/admin/users" element={<UsersListAdmin />} />

          {/* private athelte and coach routes */}
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </section>
      <ToastContainer />
    </div >
  );
}

export default Layout;
