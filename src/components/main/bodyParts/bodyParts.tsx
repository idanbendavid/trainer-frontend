import { Card } from "@mui/material"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { passBodyPartName } from "../../../features/exercises/exerciseSlice";
import backImage from "../../../assets/icons/back.png";
import cardioImage from "../../../assets/icons/cardio.png";
import chestImage from "../../../assets/icons/chest.png";
import lowerArmsImage from "../../../assets/icons/lowerArms.png";
import lowerLegsImage from "../../../assets/icons/lowerLegs.png";
import neckImage from "../../../assets/icons/neck.png";
import shouldersImage from "../../../assets/icons/shoulders.png";
import upperArmsImage from "../../../assets/icons/upperArms.png";
import upperLegsImage from "../../../assets/icons/upperLegs.png";
import waistImage from "../../../assets/icons/waist.png";
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
                {props.bodyPart.toLowerCase() === 'back' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={backImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'cardio' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={cardioImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'chest' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={chestImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'lower arms' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={lowerArmsImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'lower legs' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={lowerLegsImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'neck' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={neckImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'shoulders' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={shouldersImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'upper arms' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={upperArmsImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'upper legs' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={upperLegsImage} alt="unavailable"/>
                    </>
                }
                {props.bodyPart.toLowerCase() === 'waist' &&
                    <>
                        <h1>{props.bodyPart}</h1>
                        <img className="body-part-image" src={waistImage} alt="unavailable"/>
                    </>
                }
            </Card>
        </div>
    )
}

export default BodyParts
