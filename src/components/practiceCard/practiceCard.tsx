import { Card } from '@mui/material';
import { IPractice } from '../../models/IPractice'
import "./practiceCard.css";

function PracticeCard(props: IPractice) {
    return (
            <Card>
                <h3 hidden>{props.id}</h3>
                <img src="" alt="not currently" />
                <h4>type:{props.type} <span>where:{props.location}</span></h4>
                <p>what will you do? {props.description}</p>
                <p>recomended time:{props.duration} minutes</p>
            </Card>
    )
}

export default PracticeCard