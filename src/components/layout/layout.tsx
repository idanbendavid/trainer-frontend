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
import { remainConnceted } from '../../features/auth/authSlice';
import Menu from '../menu/menu';
import ContactUs from '../contactUs/contactUs';
import ExerciseList from '../exerciseList/exerciseList';
import { AppDispatch, useAppSelector } from '../../store';
import AdminDashbord from '../admin/adminDashbord';
import FileUpload from '../fileUpload/fileUpload';
import Gallery from '../gallery/gallery';
import UserPage from '../users/userPage';


function Layout() {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const userRole = useAppSelector((state) => state.auth.connectedUser.userRole)

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
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
  }, [dispatch,token]);

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="layout container-fluid">
      <>
        {
          <nav style={{ display: isOpen ? 'block' : 'none' }} >
            <Menu closeMenu={closeMenu} />
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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/exercisesList" element={<ExerciseList />} />
          <Route path="/*" element={<ContactUs />} />
          <Route path="/uploadImages" element={<FileUpload />} />
          <Route path="/gallery" element={<Gallery />} />

          {isLoggedIn && userRole.toLowerCase() === 'admin' &&
            <>
              <Route path="/admin" element={<AdminDashbord />} />
            </>
          }

          {isLoggedIn && userRole.toLowerCase() !== 'admin' &&
            <>
              <Route path="/users" element={<UserPage />} />
            </>
          }
        </Routes>
      </section>
      <ToastContainer />
    </div >
  );
}

export default Layout;
