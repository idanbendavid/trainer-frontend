import { InputUnstyled } from '@mui/base';
import { Box, Button, InputLabel } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IUserExerciseDetails } from '../../../../models/IUserExerciseDetails';
import userDataService from '../../../../services/userDataService';
import "./freeWorkoutForm.css";

function FreeWorkoutForm() {

    const { register, handleSubmit, setError, formState: { errors }, clearErrors, reset } = useForm<IUserExerciseDetails>({
        defaultValues: {
            exerciseName: '',
            type: '',
            numberOfSets: 1,
            numberOfRepeats: 1,
            notes: '',
            exerciseDate: Date.now().toString(),
            duration: 1
        }
    });


    const onFreeWorkoutSumbit: SubmitHandler<IUserExerciseDetails> = async (freeWorkout) => {

        let formValidation = freeWorkoutFormValidation(freeWorkout);

        if (formValidation) {
            const response = await userDataService.saveUserExerciseDetails(freeWorkout)
            if (response) {
                toast.info("your workout has been saved")
                reset();
            }
        }
    };

    function freeWorkoutFormValidation(freeWorkout: IUserExerciseDetails): boolean {
        if (!freeWorkout.exerciseName) {
            setError("exerciseName", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("exerciseName")
            }, 1500);
            return false;
        }
        if (!freeWorkout.type) {
            setError("type", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("type")
            }, 1500);
            return false;
        }
        if (!freeWorkout.exerciseDate) {
            setError("exerciseDate", { type: 'required', message: "field is required" })
            setTimeout(() => {
                clearErrors("exerciseDate")
            }, 1500);
            return false;
        }
        return true;
    }

    return (
        <div>
            <Box>
            <div className=''>
                    <InputLabel id=''>Workout Name</InputLabel>
                    <InputUnstyled type="text" placeholder='Name' id="inputUnstyled" {...register("exerciseName")}></InputUnstyled>
                    {errors.exerciseName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold',fontSize:'20px' }}>{errors.exerciseName.message}</p>}
                </div>
                <div className=''>
                    <InputLabel id=''>type</InputLabel>
                    <InputUnstyled type="text" placeholder='Type' id="inputUnstyled" {...register("type")}></InputUnstyled>
                    {errors.type && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.type.message}</p>}
                </div>
                <div className=''>
                    <InputLabel id=''>number of sets</InputLabel>
                    <InputUnstyled type="number" placeholder='Sets' id="inputUnstyled" {...register("numberOfSets")}></InputUnstyled>
                </div>
                <br />
                <div className=''>
                    <InputLabel id=''>number of Repeats</InputLabel>
                    <InputUnstyled type="number" placeholder='Repeats' id="inputUnstyled" {...register("numberOfRepeats")}></InputUnstyled>
                </div>
                <br />
                <div className=''>
                    <textarea className='' id="inputUnstyled" cols={23} rows={5} placeholder="write comments about your workout" {...register("notes")}></textarea>
                </div>
                <br />
                <div className=''>
                    <InputLabel id=''>Date</InputLabel>
                    <InputUnstyled type="date" id="inputUnstyled" {...register("exerciseDate")}></InputUnstyled>
                    {errors.exerciseDate && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold',fontSize:'20px' }}>{errors.exerciseDate.message}</p>}
                </div>
                <div className=''>
                    <InputLabel id=''>Duration In Minutes</InputLabel>
                    <InputUnstyled type="number" placeholder='Duration' id="inputUnstyled" {...register("duration")}></InputUnstyled>
                </div>
                <br />
                <div>
                    <Button variant='contained' color='primary' onClick={handleSubmit(onFreeWorkoutSumbit)}>Save Workout</Button>
                </div>
            </Box>
        </div>
    )
}

export default FreeWorkoutForm