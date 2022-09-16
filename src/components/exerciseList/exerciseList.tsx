import { Button, Card, Dialog, DialogContent, DialogTitle, Pagination, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addExerciseToUserSchedule, displayExercisesByBodyPartName } from '../../features/exercises/exerciseSlice';
import { IExercise } from '../../models/IExercise';
import { AppDispatch, useAppSelector } from '../../store';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import "./exerciseList.css";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { dateHepler } from "../../helpers/dateHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import mediaApiService from '../../services/mediaApiService';

function ExerciseList() {

    const dispatch = useDispatch<AppDispatch>();

    const [openDatePicker, setOpenDatePicker] = useState(Boolean);
    let [dateValue, setDateValue] = useState<Date | null>(null);
    let [newDateValue, setNewDateValue] = useState<Date | null>(null);
    const [newExercise, setNewExercise] = useState<IExercise>();

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    let bodyPart = useAppSelector((state) => state.exercises.bodyPart);
    const exercises = useAppSelector((state) => state.exercises.exercises);

    useEffect(() => {
        if (bodyPart) {
            let getExercisesOfBodyPart = mediaApiService.getExercisesByBodyPart(bodyPart);
            getExercisesOfBodyPart.then((getExercisesOfBodyPart) => {
                dispatch(displayExercisesByBodyPartName(getExercisesOfBodyPart));
            }).catch(error => {
                console.log(error.response.data.message)
                toast.error("failed loading data please report this problem and try again later")
            })
        }
    }, [dispatch, bodyPart]);


    if (newExercise && newDateValue) {

        let changedDate = dateHepler(newDateValue);
        let completed = false;

        const data = {
            newExercise,
            changedDate,
            completed
        }

        setTimeout(() => {
            dispatch(addExerciseToUserSchedule(data))
        }, 2000);


        setNewExercise(undefined)

        setTimeout(() => {
            setDateValue(null);
            setNewDateValue(null)
            setOpenDatePicker(false)
        }, 3000);
    }

    // pagination with material ui pagination component lines 137-147 inside the Stack
    // currentExercises (line 80) replaces the exercises array in order to conrol the pagiantion
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage: number = 10;

    const indexOfLastExercise: number = currentPage * exercisesPerPage;

    const indexOfFirstExercise: number = indexOfLastExercise - exercisesPerPage;

    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

    const paginate = (event, value) => {
        setCurrentPage(value);
    }

    return (
        <div className="exercise-list">
            <div className="exercise-card-div-heading">
                <h1>choose the {bodyPart} exercise you want to perform</h1>
            </div>
            <div className="exercise-card-div">
                {currentExercises.map((exercise: IExercise, index: number) => {
                    return <Card key={index} >
                        <div className="exercise-name">
                            <p>{exercise.name}</p>
                        </div>
                        <div>
                            <LazyLoadImage id="gifUrl" src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
                        </div>
                        <div className='body-part-and-target'>
                            <Button sx={{ ml: '5px', color: '#fff', background: '#001BFF', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.bodyPart}</Button>
                            <Button sx={{ ml: '5px', color: '#fff', background: '#FF8C31', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.target}</Button>
                        </div>
                        {isLoggedIn && <div className='add-exercise-button'>
                            <Button variant='contained' color='success' onClick={() => {
                                setNewExercise(exercise);
                                setOpenDatePicker(true)
                            }}>
                                Add to schedule</Button>
                        </div>
                        }
                    </Card>
                })}
            </div>
            {openDatePicker &&
                <div className='date-picker-div'>
                    <Dialog open={openDatePicker} onClose={(reason: "backdropClick" | "escapeKeyDown") => setOpenDatePicker(false)}>
                        <DialogTitle className='close-date-picker-button'>
                            choose the date you want to train
                            <Button color="error" variant='contained' onClick={() => setOpenDatePicker(false)}>X</Button>
                        </DialogTitle>
                        <DialogContent>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Exercise Date"
                                    value={dateValue}
                                    onChange={(newDateValue) => {
                                        setNewDateValue(newDateValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </DialogContent>
                    </Dialog>
                </div>
            }
            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} mt={2}>
                {exercises.length > exercisesPerPage &&
                    < Pagination color='primary'
                        shape='circular'
                        count={Math.ceil(exercises.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                }
            </Stack>
        </div >
    )
}

export default ExerciseList