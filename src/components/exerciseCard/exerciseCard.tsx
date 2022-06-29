import { Card } from '@mui/material';
import { IExercise } from '../../models/IExercise'
import "./exerciseCard.css";

function ExerciseCard(props: IExercise) {
    return (
        <Card>
            <h3 hidden>{props.id}</h3>
            <img src={props.gifUrl} alt="not currently" />
            <h4>name: {props.name}</h4>
            <p>body part: {props.bodyPart}</p>
            <p>target: {props.target}</p>
            <p>equipment: {props.equipment}</p>
        </Card>
    )
}

export default ExerciseCard