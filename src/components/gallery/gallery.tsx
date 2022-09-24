import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFilesFromServer } from '../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../store';
import "./gallery.css";
import { Slide } from 'react-slideshow-image';
import FileUpload from '../fileUpload/fileUpload';
import { Box, Button, Container, CssBaseline, InputLabel } from '@mui/material';
import { InputUnstyled } from '@mui/base';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import publicComplatinsService from '../../services/publicComplaints';
import regexes from '../../helpers/regex';


function Gallery() {


    const dispatch = useDispatch<AppDispatch>();
    let gallery = useAppSelector((state) => state.media.gallery);

    useEffect(() => {
        dispatch(getFilesFromServer())
    }, [dispatch])

    const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm<any>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            complaintCategory: "",
            description: ""
        }
    });

    const onGalleryProblemFormSubmit: SubmitHandler<any> = async (userComplaint) => {
        if (!userComplaint.firstName) {
            setError("firstName", {type: 'required', message: "field is required"})
            setTimeout(() => {
                clearErrors("firstName")
            }, 1500);
            return;
        }
        if (!userComplaint.lastName) {
            setError("lastName", {type: 'required', message: "field is required"})
            setTimeout(() => {
                clearErrors("lastName")
            }, 1500);
            return;
        }
        if (!userComplaint.email) {
            setError("email", {type: 'required', message: "field is required"})
            setTimeout(() => {
                clearErrors("email")
            }, 1500);
            return;
        }
        if (!userComplaint.email.match(regexes.emailReg)) {
            setError("email", {type: 'pattern', message: "Invalid Email Address"})
            setTimeout(() => {
                clearErrors("email")
            }, 1500);
            return;
        }
        if (!userComplaint.complaintCategory) {
            setError("complaintCategory", {type: 'required', message: "field is required"})
            setTimeout(() => {
                clearErrors("complaintCategory")
            }, 1500);
            return;
        }
        if (!userComplaint.description) {
            setError("description", {type: 'required', message: "field is required"})
            setTimeout(() => {
                clearErrors("description")
            }, 1500);
            return;
        }

        else {
            const response = await publicComplatinsService.newComplaint(userComplaint)
            if (response) {
                toast.info("your complaint has been recieved")
            }
        }

    };

    return (
        <>
            <div className='gallery-heading'>
                <h1>Welcome to our gallery</h1>
            </div>
            <div className='gallery-main-container'>
                <aside className='file-upload-in-gallery'>
                    <h3>Share your progress with us</h3>
                    <FileUpload />
                </aside>
                <div className="slide-container">
                    <Slide>
                        {gallery.map((slideImage, index) => (
                            <div className="each-slide" key={index}>
                                <img key={slideImage.file_path} src={slideImage.file_path} alt={slideImage.file_name.replace(/\..+$/, '')} className='image-in-gallery' />
                                <span className='slide-image-span' key={slideImage.file_name}>{slideImage.file_name.replace(/\..+$/, '')}</span>
                            </div>
                        ))}
                    </Slide>
                </div>
                <aside>
                    <Container>
                        <CssBaseline />
                        <h3>Dissatisfied with an image? write to us and we will solve your problem</h3>
                        <Box>
                            <div className='image-problem-first-name'>
                                <InputLabel id='imageFirstName'>First Name</InputLabel>
                                <InputUnstyled type="text" placeholder='First Name'  {...register("firstName")}></InputUnstyled>
                                {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.firstName.message}</p>}
                            </div>
                            <div className='image-problem-last-name'>
                                <InputLabel id='imageLastName'>Last Name</InputLabel>
                                <InputUnstyled type="text" placeholder='Last Name'  {...register("lastName")}></InputUnstyled>
                                {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.lastName.message}</p>}

                            </div>
                            <div className='image-problem-email'>
                                <InputLabel id='imageEmail'>Email</InputLabel>
                                <InputUnstyled type="email" placeholder='Email' {...register("email")}></InputUnstyled>
                                {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.email.message}</p>}
                            </div>
                            <div className='image-problem-category'>
                                <InputLabel id='imageCategory'>Category</InputLabel>
                                <select className='gallery-select' {...register("complaintCategory")}>
                                    <option>image</option>
                                    <option>gallery</option>
                                </select>
                                {errors.complaintCategory && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.complaintCategory.message}</p>}
                            </div>
                            <br />
                            <div className='image-problem-description'>
                                <textarea className='problem-with-image' placeholder="Please explain your problem" {...register("description")}></textarea>
                                {errors.description && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.description.message}</p>}
                            </div>
                            <div>
                                <Button variant='contained' onClick={handleSubmit(onGalleryProblemFormSubmit)}>Send</Button>
                            </div>
                        </Box>
                    </Container>
                </aside>
            </div>
        </>
    )
}

export default Gallery