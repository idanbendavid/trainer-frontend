import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CssBaseline, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { getExercisesFromApi, resetExerciseNamesArray, resetImage } from "../../../features/media/mediaSlice";
import { IExercise } from "../../../models/IExercise";
import { AppDispatch, useAppSelector } from "../../../store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataDialogs from "../dataDialogs/dataDialog";
import Video from "../video/video";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch<AppDispatch>();

    const [type, setType] = useState('');
    const [imageOfMuscle, setImageOfMuscle] = useState(String || null);
    const [exerciseToVideo, setExerciseToVideo] = useState(String || null);
    const [exerciseToDisplayByName, setExerciseToDisplayByName] = useState('');

    let exercises = useAppSelector((state) => state.media.exercises);
    let exercisesNameArray = useAppSelector((state) => state.media.exercisesNameArray);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    function getExercies(): void {
        if (!type) {
            toast.error("select the type of your next workout");
            return;
        }

        dispatch(resetExerciseNamesArray());
        dispatch(getExercisesFromApi(type));
        setExerciseToDisplayByName("");
        setExerciseToVideo(null);
        setImageOfMuscle(null);
    }

    function videoAndImageState(muscle: string | null, name: string | null): void {
        if (!isLoggedIn) {
            toast.info("must be connected to view asked content");
        }
        else {
            if (muscle !== null) {
                setImageOfMuscle(muscle);
                setExerciseToVideo(null);
            }

            if (name !== null) {
                setImageOfMuscle(null);
                setExerciseToVideo(name);
                resetImage();
            }
        }
    }

    function resetProp() {
        setExerciseToVideo(null)
    }

    return (
        <div className="main">
            <div className="main-heading">
                <h1>Care2Fitness</h1>
                <p>your goals our mission</p>
            </div>
            <div className="select-lists-options">
                <p>Select type of training</p>
                <div className="type-select-div">
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
            <CssBaseline />
            {exercises.length < 1 &&
                <h1 className="notify-exercises">to enter the contest choose the type of exercise you want to perform</h1>
            }
            <div className="exercise-main">
                {exercises.length > 1 &&
                    <div className="exercise-name-list">
                        <h1>Exercises</h1>
                        {exercisesNameArray.filter((name, index) => {
                            return exercisesNameArray.indexOf(name) === index
                        }).map((exerciseName: string, index: number) => {
                            return <ul key={index} className="name-list-item">
                                <li key={exerciseName} onClick={() => { setExerciseToDisplayByName(exerciseName); setExerciseToVideo(null); }}>{exerciseName}</li>
                            </ul>
                        })}
                    </div>
                }
                <div>
                    {exercises.filter((obj, index) => exercises.findIndex((item) => item.name === obj.name) === index)
                        .map((exercise: IExercise, index: number) => {
                            if (exercise.name === exerciseToDisplayByName) {
                                return <Card key={index} className="exercise-details">
                                    <div className="exercise-details-main">
                                        <h1 key={exercise.name}>{exercise.name.replace(/_/g, " ")} - {exercise.type.replace(/_/g, " ")} workout</h1>
                                        <div className="exercise-options-div">
                                            <h3 key={exercise.muscle}>designated muscle: {exercise.muscle.replace(/_/g, " ")}</h3>
                                            <h3 key={exercise.difficulty}>difficulty: {exercise.difficulty.replace(/_/g, " ")}</h3>
                                            <h3 key={exercise.equipment}>equipment: {exercise.equipment.replace(/_/g, " ")}</h3>
                                        </div>
                                        <div className="exercise-buttons">
                                            <Button color="primary" variant="contained" title="View Muscle" className="muscle-button" onClick={() => { videoAndImageState(exercise.muscle, null); }}>View Muscle</Button>
                                            <Button color="success" variant="contained" title="video example" className="video-button" onClick={() => { videoAndImageState(null, exercise.name); }}>Workout Video</Button>
                                        </div>
                                    </div>
                                    <Accordion defaultExpanded={false} square={true} sx={{ marginBottom: '16px' }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography>Instructions</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="exercise-details-secondary">
                                            <Typography key={exercise.instructions}>{exercise.instructions}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Card>
                            }
                            return null
                        })}
                </div>
                <div>
                    {isLoggedIn && (imageOfMuscle !== null && imageOfMuscle !== "") &&
                        <DataDialogs muscle={imageOfMuscle} />
                    }
                    {isLoggedIn && (exerciseToVideo !== null && exerciseToVideo !== "") &&
                        <Video exerciseToVideo={exerciseToVideo} resetProp={resetProp} />
                    }
                </div>
            </div>
        </div >
    )
}
