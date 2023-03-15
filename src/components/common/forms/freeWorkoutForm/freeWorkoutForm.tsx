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
        <div className='free-workout-form'>
            <h1>Which workout have you done?</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div className='free-workout-group1'>
                    <div className='free-workout-name'>
                        <InputLabel id='nameLabel'>Workout Name</InputLabel>
                        <InputUnstyled type="text" placeholder='Name' id="inputUnstyled" {...register("exerciseName")}></InputUnstyled>
                        {errors.exerciseName && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.exerciseName.message}</p>}
                    </div>
                    <div className='free-workout-notes'>
                        <InputLabel id='notesLabel'>notes</InputLabel>
                        <textarea id="inputUnstyled" cols={25} rows={5} maxLength={50} placeholder="short description of your workout" {...register("notes")}></textarea>
                    </div>
                </div>

                <div className='free-workout-group2'>
                    <div className='free-workout-type'>
                        <InputLabel id='typeLabel'>type</InputLabel>
                        {/* <InputUnstyled type="text" placeholder='Type' id="inputUnstyled" {...register("type")}></InputUnstyled> */}
                        <select {...register("type")}>
                            <option value="" defaultChecked disabled>Type</option>
                            <option value="areobic">areobic</option>
                            <option value="unareobic">unareobic</option>
                            <option value="core">core</option>
                            <option value="cardio">cardio</option>
                            <option value="olympic_weightlifting">olympic weightlifting</option>
                            <option value="plyometrics">plyometrics</option>
                            <option value="powerlifting">powerlifting</option>
                            <option value="strength">strength</option>
                            <option value="stretching">stretching</option>
                            <option value="strongman">strongman</option>
                        </select>
                        {errors.type && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.type.message}</p>}
                    </div>
                    <div className='free-workout-sets'>
                        <InputLabel id='setsLabel'>number of sets</InputLabel>
                        <InputUnstyled type="number" placeholder='Sets' id="inputUnstyled" {...register("numberOfSets")}></InputUnstyled>
                    </div>
                    <div className='free-workout-repeats'>
                        <InputLabel id='repeatsLabel'>number of Repeats</InputLabel>
                        <InputUnstyled type="number" placeholder='Repeats' id="inputUnstyled" {...register("numberOfRepeats")}></InputUnstyled>
                    </div>
                </div>

                <div className='free-workout-group3'>
                    <div className='free-workout-duration'>
                        <InputLabel id='durationLabel'>Duration (In Minutes)</InputLabel>
                        <InputUnstyled type="number" placeholder='Duration' id="inputUnstyled" {...register("duration")}></InputUnstyled>
                    </div>
                    <div className='free-workout-date'>
                        <InputLabel id='dateLabel'>Date</InputLabel>
                        <InputUnstyled type="date" id="inputUnstyled" {...register("exerciseDate")} ></InputUnstyled>
                        {errors.exerciseDate && <p style={{ color: 'red', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '20px' }}>{errors.exerciseDate.message}</p>}
                    </div>
                </div>
            </Box>
            <div className='save-workout-button'>
                <Button variant='contained' color='primary' onClick={handleSubmit(onFreeWorkoutSumbit)}>Save Workout</Button>
            </div>
        </div>
    )
}

export default FreeWorkoutForm