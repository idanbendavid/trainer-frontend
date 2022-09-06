import { Button, Card, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addExerciseToUserSchedule, displayExercisesByBodyPartName } from '../../features/exercises/exerciseSlice';
import { IExercise } from '../../models/IExercise';
import { useAppSelector } from '../../store';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import "./exerciseList.css";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { dateHepler } from "../../helpers/dateHelper";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ExerciseList() {

    const dispatch = useDispatch();
    const [openDatePicker, setOpenDatePicker] = useState(Boolean);
    let [dateValue, setDateValue] = useState<Date | null>(null);
    let [newDateValue, setNewDateValue] = useState<Date | null>(null);
    const [newExercise, setNewExercise] = useState<IExercise>();

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    let bodyPart = useAppSelector((state) => state.exercises.bodyPart);
    const exercises = useAppSelector((state) => state.exercises.exercises);

    useEffect(() => {
        if (bodyPart) {
            axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_TRAINER_RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.REACT_APP_TRAINER_RAPID_API_HOST
                },
            }).then((response) => {
                dispatch(displayExercisesByBodyPartName(response.data))
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

    return (
        <div className="exercise-list">
            <div className="exercise-card-div-heading">
                <h1>choose the exercise you want to perform</h1>
            </div>
            <div className="exercise-card-div">
                {exercises.map((exercise: IExercise, index: number) => {
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
        </div >
    )
}

export default ExerciseList