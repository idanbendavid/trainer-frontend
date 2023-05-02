import { Box, InputLabel, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import InputUnstyled from '@mui/base/InputUnstyled';
import regexes from "../../../../helpers/regex";
import { IComplaint } from "../../../../models/IComplaint";
import adminService from "../../../../services/adminService";
import { useAppSelector } from "../../../../store";
import React from "react";
import "./complaintFormComponent.css";

function ComplaintFormComponent() {

    let userDetails = useAppSelector((state) => state.auth.connectedUser);

    const { register, handleSubmit, setError, formState: { errors }, clearErrors, reset } = useForm<IComplaint>({
        defaultValues: {
            firstName: userDetails.firstName || "",
            lastName: userDetails.lastName || "",
            email: userDetails.email || "",
            complaintCategory: "",
            description: ""
        }
    });

    const onProblemFormSubmit: SubmitHandler<IComplaint> = async (userComplaint) => {

        let formValidation = complaintFormValidation(userComplaint);
        if (formValidation) {
            const response = await adminService.newComplaint(userComplaint)
            if (response) {
                toast.info("your complaint has been recieved")
                reset();
            }
        }
    };

    function complaintFormValidation(userComplaint: IComplaint): boolean {
        if (!userComplaint.firstName) {
            setError("firstName", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("firstName")
            }, 1500);
            return false;
        }
        if (!userComplaint.lastName) {
            setError("lastName", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("lastName")
            }, 1500);
            return false;
        }
        if (!userComplaint.email) {
            setError("email", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("email")
            }, 1500);
            return false;
        }
        if (!userComplaint.email.match(regexes.emailReg)) {
            setError("email", { type: 'pattern', message: "Invalid Email Address" })
            setTimeout(() => {
                clearErrors("email")
            }, 1500);
            return false;
        }
        if (!userComplaint.complaintCategory) {
            setError("complaintCategory", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("complaintCategory")
            }, 1500);
            return false;
        }
        if (!userComplaint.description) {
            setError("description", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("description")
            }, 1500);
            return false;
        }
        return true;
    }
    
    return (
        <div>
            <Box style={{ display: 'flex', flexDirection: 'column'}}>
                <div className='complaint-form-first-name'>
                    <InputLabel id='labelFirstName'>First Name</InputLabel>
                    <InputUnstyled type="text" placeholder='First Name' id="inputUnstyled" {...register("firstName")}></InputUnstyled>
                    {errors.firstName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold',fontSize:'20px' }}>{errors.firstName.message}</p>}
                </div>
                <div className='complaint-form-last-name'>
                    <InputLabel id='labelLastName'>Last Name</InputLabel>
                    <InputUnstyled type="text" placeholder='Last Name' id="inputUnstyled" {...register("lastName")}></InputUnstyled>
                    {errors.lastName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.lastName.message}</p>}
                </div>
                <div className='complaint-form-email'>
                    <InputLabel id='labelEmail'>Email</InputLabel>
                    <InputUnstyled type="email" placeholder='Email' id="inputUnstyled" {...register("email")}></InputUnstyled>
                    {errors.email && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.email.message}</p>}
                </div>
                <div className='complaint-form-category'>
                    <InputLabel id='labelCategory'>Category</InputLabel>
                    <select className='complaint-select' {...register("complaintCategory")}>
                        <option value="" defaultChecked disabled>select category</option>
                        <option value="gallery">gallery</option>
                        <option value="profile">profile</option>
                        <option value="exercises">exercises</option>
                        <option value="other">other</option>
                    </select>
                    {errors.complaintCategory && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.complaintCategory.message}</p>}
                </div>
                <br />
                <div className='complaint-form-description'>
                    <textarea placeholder="Please explain your problem" {...register("description")}></textarea>
                    {errors.description && <p style={{ color: 'red', textTransform: 'capitalize', fontSize: '20px', fontWeight: 'bold' }}>{errors.description.message}</p>}
                </div>
                <div>
                    <Button variant='contained' onClick={handleSubmit(onProblemFormSubmit)}>Send</Button>
                </div>
            </Box>
        </div>
    )
}

export default ComplaintFormComponent