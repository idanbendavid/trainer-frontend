import { Home } from "@mui/icons-material";
import { Container, CssBaseline, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBodyPartsList } from "../../features/exercises/exerciseSlice";
import { useAppSelector } from "../../store";
import BodyParts from "./bodyParts/bodyParts";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let bodyParts = useRef(useAppSelector((state) => state.exercises.bodyParts))

    useEffect(() => {
        axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_TRAINER_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_TRAINER_RAPID_API_HOST
            },
        }).then((response) => {
            bodyParts.current = response.data
            dispatch(getBodyPartsList(bodyParts.current))
        }).catch(error => {
            console.log(error.response.data.message)
            toast.error("failed loading data please report this problem and try again later")
        })
    }, [dispatch]);


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
                        <li onClick={() => navigate("/*")}>need help? contact us</li>
                    </ul>
                </nav>
            </div>
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
