import { Home } from "@mui/icons-material";
import { Container, CssBaseline, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getExercises } from "../../features/exercises/exerciseSlice";
import { IExercise } from "../../models/IExercise";
import { useAppSelector } from "../../store";
import ExerciseCard from "../exerciseCard/exerciseCard";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const exercises = useRef(useAppSelector((state) => state.exercises.exercises))

    useEffect(() => {
        axios.get('https://exercisedb.p.rapidapi.com/exercises', {
            headers: {
                'X-RapidAPI-Key': '81c0c45b69msh9f164b5b4ed305cp1441eejsn833407ae1c5a',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            },
        }).then((response) => {
            console.log(response)
            exercises.current = response.data
            dispatch(getExercises(exercises.current))
        }).catch(error => {
            toast.error(error)
        })
    }, [dispatch]);




    function moveToNeedHelpComponent() {
        navigate("/*");
    }

    return (
        <div className="main">
            <div>
                <nav >
                    <ul className="user-enrichness-navbar">
                        <li>
                            <Home fontSize='large' />
                        </li>
                        <li>articles</li>
                        <li>gallery</li>
                        <li>guidance</li>
                        {/* in a drop down list for guidance there will be a nutriotion component */}
                        <li>connect with athletes</li>
                        <li onClick={moveToNeedHelpComponent}>need help? contact us</li>
                    </ul>
                </nav>
            </div>
            <Container maxWidth="xl" >
                <CssBaseline />
                <Box sx={{ overflowY: 'auto', marginTop: 8, display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridTemplateRows: '1fr', justifyItems: "center", border: '2px solid blue', paddingTop: '20px' }} >
                    {exercises.current.map((exercise: IExercise, index: number) => (
                        <ExerciseCard key={index} id={exercise.id} name={exercise.name} bodyPart={exercise.bodyPart} 
                        equipment={exercise.equipment} target={exercise.target} gifUrl={exercise.gifUrl}/>
                    ))}
                </Box>
            </Container>
        </div>
    )
}
