import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import "./gallery.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import FileUpload from '../fileUpload/fileUpload';
import { Button, Container, CssBaseline } from '@mui/material';
import { toast } from 'react-toastify';
import ComplaintFormComponent from '../forms/complaintForm/complaintFormComponent';
import { getFilesFromServer, deleteFileFromServer } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import React from 'react';


function Gallery() {


    const dispatch = useDispatch<AppDispatch>();
    let gallery = useAppSelector((state) => state.media.gallery);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let admin = useAppSelector((state) => state.auth.connectedUser.userRole);

    const [fileToDelete, setFileToDelete] = useState("");

    useEffect(() => {
        dispatch(getFilesFromServer())
    }, [dispatch])


    const getNameOfFileToDelete = (event: ChangeEvent<HTMLInputElement>) => {
        setFileToDelete(event.target.value);
    }

    function deleteFile() {
        if (!fileToDelete || fileToDelete === "") {
            toast.error("file name can't be empty");
            return;
        }

        gallery.forEach(file => {
            if (file.file_name.replace(/\..+$/, '') === fileToDelete) {
                dispatch(deleteFileFromServer(file.file_name));
            }
        });
    }

    const responsiveSettings = [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];

    return (
        <>
            <div className="main-heading">
                <h1>Care2Fitness</h1>
                <p>your goals our mission</p>
            </div>
            <div className='gallery-heading'>
                <h1>Welcome to our gallery</h1>
            </div>
            <div className='gallery-main-container'>
                <div>
                    {isLoggedIn && admin.toLowerCase() === 'admin' &&
                        <aside className='file-upload-in-gallery'>
                            <h3>please enter the name of the image you want to delete</h3>
                            <br />
                            <label htmlFor="input">File Name </label>
                            <input type="text" onChange={getNameOfFileToDelete} />
                            <br /><br />
                            <Button variant='contained' color='warning' onClick={deleteFile}>Delete Image</Button>
                        </aside>
                    }
                    {isLoggedIn && admin.toLowerCase() !== 'admin' &&
                        <aside className='file-upload-in-gallery'>
                            <h3>Share your progress with us</h3>
                            <FileUpload />
                        </aside>
                    }
                    {!isLoggedIn &&
                        <aside className='file-upload-in-gallery'>
                            <h3>Enjoy our training? please log in to share your progress with us</h3>
                        </aside>
                    }
                </div>
                <div className="slide-container">
                    <Slide responsive={responsiveSettings}>
                        {gallery.map((slideImage, index) => (
                            <div className="each-slide" key={index}>
                                <img className='image-in-gallery' key={slideImage.file_path} src={slideImage.file_path} alt={slideImage.file_name.replace(/\..+$/, '')} />
                                <span className='slide-image-span' key={slideImage.file_name}>{slideImage.file_name.replace(/\..+$/, '')}</span>
                            </div>
                        ))}
                    </Slide>
                </div>
                <div className='gallery-aside-form'>
                    {admin.toLocaleLowerCase() !== 'admin' &&
                        <Container>
                            <CssBaseline />
                            <h3>Dissatisfied with an image? write to us and we will solve your problem</h3>
                            <div>
                                <ComplaintFormComponent />
                            </div>
                        </Container>
                    }
                </div>
            </div>
        </>
    )
}

export default Gallery