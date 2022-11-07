import { Container, CssBaseline } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getBodyPartsList } from "../../../features/exercises/exerciseSlice";
import mediaApiService from "../../../services/mediaApiService";
import { AppDispatch, useAppSelector } from "../../../store";
import BodyParts from "./bodyParts/bodyParts";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch<AppDispatch>();

    let bodyParts = useRef(useAppSelector((state) => state.exercises.bodyParts))

    useEffect(() => {
        let getBodyPartResopnse = mediaApiService.getListOfBodyParts();
        getBodyPartResopnse.then((getBodyPartResopnse) => {
            bodyParts.current = getBodyPartResopnse
            dispatch(getBodyPartsList(bodyParts.current))
        }).catch(error => {
            console.log(error.response.data.message)
            toast.error("failed loading data please report this problem and try again later")
        })
    }, [dispatch]);


    return (
        <div className="main">
            <div className="main-heading">
                <h1>Core2Fitness</h1>
                <p>your goals our mission</p>
            </div>
            <Container maxWidth="xl" >
                <CssBaseline />
                <div className="second-heading">
                    <h1>what will we do today?</h1>
                </div>
                <div className="body-parts-main">
                    {bodyParts.current.map((bodyPart: string, index: number) => (
                        <BodyParts key={index} bodyPart={bodyPart} />
                    ))}
                </div>
            </Container>
        </div>
    )
}
