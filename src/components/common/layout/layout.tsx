import './layout.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from '../main/main';
import Menu from '../menu/menu';
import ContactUs from '../contactUs/contactUs';
import FileUpload from '../fileUpload/fileUpload';
import LandingPage from '../landingPage/landingPage';
import AdminDashboard from '../../admin/adminDashboard';
import LoginPage from '../../users/auth/login/login';
import Register from '../../users/auth/register/register';
import UserPage from '../../users/userPage';
import { useAppSelector, AppDispatch } from '../../../store';
import { remainConnceted } from '../../../features/user/auth/authSlice';
import { UserRole as role } from '../../../models/role'
import React from 'react';
const Gallery = lazy(() => import('../gallery/gallery'));
import workoutImage from "../../../../public/anastase-maragos-YVz1LxVJqoA-unsplash.jpg";

function Layout() {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const userRole = useAppSelector((state) => state.auth.connectedUser.userRole)

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      console.log("no token");
      navigate("/welcome")
    }
  }, [dispatch, token]);


  return (
    <div className="layout container-fluid">
      <img src={workoutImage} alt="workoutImage" className='bacground-image-all-app' />
      <>
        {
          <nav style={{ display: isMenuOpen ? 'block' : 'none' }} >
            <Menu setIsMenuOpen={setIsMenuOpen} />
          </nav>
        }
      </>
      <section>
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)} id="menuButton">
          {!isMenuOpen &&
            <MenuIcon fontSize='large' id="menuIcon" />
          }
          {isMenuOpen &&
            <CloseIcon fontSize='large' id="closeMenuIcon" />
          }
        </Button>
        <Routes>
          {!isLoggedIn &&
            <Route path="/welcome" element={<LandingPage />} />
          }
          <Route path="/" element={<Navigate to="/main" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/*" element={<ContactUs />} />
          <Route path="/uploadImages" element={<FileUpload />} />
          <Route path="/gallery" element={
            <Suspense fallback={<div>...loading</div>}>
              <Gallery />
            </Suspense>
          } />
          {isLoggedIn && userRole === role.Admin &&
            <>
              <Route path="/admin" element={<AdminDashboard />} />
            </>
          }
          {isLoggedIn && userRole === role.Athlete &&
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
