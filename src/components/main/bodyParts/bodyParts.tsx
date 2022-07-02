import { Card } from "@mui/material"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { passBodyPartName } from "../../../features/exercises/exerciseSlice";
import "./bodyParts.css"

function BodyParts(props) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function getBodyPart() {
        let bodyPart = props.bodyPart;
        dispatch(passBodyPartName(bodyPart));
        navigate("/exercisesList")
    }

    return (
        <div className="bodyParts">
            <Card onClick={getBodyPart}>
                <h1>
                    {props.bodyPart}
                </h1>
            </Card>
        </div>
    )
}

export default BodyParts