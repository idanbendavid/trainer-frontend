import { Button, Card, Container, CssBaseline } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getExercisesFromApi } from "../../../features/media/mediaSlice";
import { IApiNinjas } from "../../../models/IApiNinjas";
import { AppDispatch, useAppSelector } from "../../../store";
import DataDialogs from "../dataDialogs/dataDialog";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch<AppDispatch>();

    const [level, setLevel] = useState('');
    const [type, setType] = useState('');
    const [imageOfMuscle, setImageOfMuscle] = useState('');
    const [instruction, setInstruction] = useState('');

    let exercises = useAppSelector((state) => state.media.exercises);

    const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLevel(event.target.value);
    };

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    useEffect(() => {
        if (exercises.length === 0) {
            toast.info("nothing found");
            return;
        }
    }, [exercises])

    function getExercies(): void {
        if (!level || !type) {
            toast.error("select both level and type");
            return;
        }

        let params = {
            level,
            type
        }

        dispatch(getExercisesFromApi(params));
    }

    function getImageOfMuscle(muscle: string) {
        if (!muscle) {
            console.error("no value")
            return;
        }

        setImageOfMuscle(muscle);
    }

    function viewInstrctions(instructions: string) {
        if (!instructions) {
            console.error("no value")
            return;
        }

        setInstruction(instructions);
    }

    return (
        <div className="main">
            <div className="main-heading">
                <h1>Core2Fitness</h1>
                <p>your goals our mission</p>
            </div>
            <div className="select-lists-options">
                <p>Select level and type of training</p>
                <div className="level-select-div">
                    <label>level</label>
                    <select className="level-select" defaultValue="default" onChange={handleLevelChange}>
                        <option disabled value="default" defaultChecked>select level</option>
                        <option value="beginner"> beginner</option>
                        <option value="intermediate"> intermediate</option>
                        <option value="expert"> expert</option>
                    </select>
                </div>
                <div className="type-select-div">
                    <label>type</label>
                    <select className="type-select" defaultValue="default" onChange={handleTypeChange}>
                        <option disabled value="default" defaultChecked>select type</option>
                        <option value="cardio">cardio</option>
                        <option value="olympic_weightlifting">olympic weightlifting</option>
                        <option value="plyometrics">plyometrics</option>
                        <option value="powerlifting">powerlifting</option>
                        <option value="strength">strength</option>
                        <option value="stretching">stretching</option>
                        <option value="strongman">strongman</option>
                    </select>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={getExercies}>get exercises</Button>
                </div>
            </div>
            <Container maxWidth="xl" >
                <CssBaseline />
                <div className="exercise-main">
                    {exercises.map((exercise: IApiNinjas, index: number) => {
                        return <Card key={index} className="exercise-card">
                            <h1>name: {exercise.name}</h1>
                            <h3>level: {exercise.difficulty}</h3>
                            <h2>type: {exercise.type}</h2>
                            <p>muscle: {exercise.muscle}</p>
                            <p>equipment: {exercise.equipment}</p>
                            <Button variant="contained" color="primary" onClick={() => viewInstrctions(exercise.instructions)}>instructions</Button>
                            <Button variant="contained" color="success" onClick={() => getImageOfMuscle(exercise.muscle)}>view muscle</Button>
                        </Card>
                    })}
                </div>
                <div className="main-image-of-muscle">
                    {imageOfMuscle &&
                        <DataDialogs muscle={imageOfMuscle} />
                    }
                </div>
                <div className="main-exercise-instruction">
                    {instruction &&
                        <DataDialogs instructions={instruction} />
                    }
                </div>
            </Container>
        </div>
    )
}
