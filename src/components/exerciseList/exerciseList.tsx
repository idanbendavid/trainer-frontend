import { Card, Pagination, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
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




    return (
        <div className="exercise-list">
            <div className="exercise-card-div-heading">
                <h1>choose the exercise you want to perform</h1>
            </div>
            <div className="exercise-card-div">
                {exercises.map((exercise: IExercise, index: number) => {
                    return <Card key={index} >
                        <img id="gifUrl" src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
                        <h4>name: {exercise.name}</h4>
                        <p>body part: {exercise.bodyPart}</p>
                        <p>target: {exercise.target}</p>
                        <p>equipment: {exercise.equipment}</p>
                    </Card>
                })}
            </div>
        </div >
    )
}

export default ExerciseList