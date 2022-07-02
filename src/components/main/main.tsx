import { Home } from "@mui/icons-material";
import { Container, CssBaseline, Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
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
    let bodyParts = useAppSelector((state) => state.exercises.bodyParts)

    useEffect(() => {
        axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': ''
            },
        }).then((response) => {
            bodyParts = response.data
            dispatch(getBodyPartsList(bodyParts))
        }).catch(error => {
            toast.error(error)
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
                <Box sx={{ overflowY: 'auto', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', justifyItems: 'center'}} >
                    {bodyParts.map((bodyPart: string, index: number) => (
                        <BodyParts key={index} bodyPart={bodyPart}/>
                    ))}
                </Box>
            </Container>
        </div>
    )
}
