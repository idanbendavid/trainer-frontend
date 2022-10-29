import { Container, CssBaseline, Box } from "@mui/material";
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
            <Container maxWidth="xl" >
                <CssBaseline />
                <div className="main-heading">
                    <h1>what will we do today?</h1>
                </div>
                <Box sx={{ overflowY: 'auto', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', justifyItems: 'center' }} >
                    {bodyParts.current.map((bodyPart: string, index: number) => (
                        <BodyParts key={index} bodyPart={bodyPart} />
                    ))}
                </Box>
            </Container>
        </div>
    )
}
