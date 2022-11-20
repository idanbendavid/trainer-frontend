import { Box, InputLabel, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import InputUnstyled from '@mui/base/InputUnstyled';
import regexes from "../../../helpers/regex";
import { IComplaint } from "../../../models/IComplaint";
import publicComplatinsService from "../../../services/publicComplaintsService";
import { useAppSelector } from "../../../store";

function FormComponents() {

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
            const response = await publicComplatinsService.newComplaint(userComplaint)
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
                        <option>gallery</option>
                        <option>profile</option>
                        <option>exercises</option>
                        <option>other</option>
                    </select>
                    {errors.complaintCategory && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.complaintCategory.message}</p>}
                </div>
                <br />
                <div className='image-problem-description'>
                    <textarea className='problem-with-image' placeholder="Please explain your problem" {...register("description")}></textarea>
                    {errors.description && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold' }}>{errors.description.message}</p>}
                </div>
                <div>
                    <Button variant='contained' onClick={handleSubmit(onProblemFormSubmit)}>Send</Button>
                </div>
            </Box>
        </div>
    )
}

export default FormComponents