import { Button, Card } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { displayExercisesByBodyPartName } from '../../features/exercises/exerciseSlice';
import { IExercise } from '../../models/IExercise';
import { useAppSelector } from '../../store';
import "./exerciseList.css";

function ExerciseList() {

    const dispatch = useDispatch();

    let bodyPart = useAppSelector((state) => state.exercises.bodyPart);
    const exercises = useAppSelector((state) => state.exercises.exercises);

    useEffect(() => {
        if (bodyPart) {
            axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
                headers: {
                    'X-RapidAPI-Key': '',
                    'X-RapidAPI-Host': ''
                },
            }).then((response) => {
                dispatch(displayExercisesByBodyPartName(response.data))
            }).catch(error => {
                toast.error(error)
            })
        }
    }, [dispatch, bodyPart]);


    function addPracticeToSchedule(exercise: IExercise) {
        console.log(exercise)
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
                            <img id="gifUrl" src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
                        </div>
                        <div >
                            <Button sx={{ ml: '5px', color: '#fff', background: '#001BFF', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.bodyPart}</Button>
                            <Button sx={{ ml: '5px', color: '#fff', background: '#FF8C31', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>{exercise.target}</Button>
                        </div>
                        <div className='add-practice-button'>
                            <Button variant='contained' color='success' onClick={() => addPracticeToSchedule(exercise)}>Add to schedule</Button>
                        </div>
                    </Card>
                })}
            </div>
        </div >
    )
}

export default ExerciseList