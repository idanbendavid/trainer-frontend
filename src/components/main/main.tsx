import { Home } from "@mui/icons-material";
import { Container, CssBaseline, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getPractices } from "../../features/practices/practiceSlice";
import { IPractice } from "../../models/IPractice";
import { useAppSelector } from "../../store";
import PracticeCard from "../practiceCard/practiceCard";
import "./main.css";

export default function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const practices = useRef(useAppSelector((state) => state.practices.practices))

    useEffect(() => {
        axios.get('https://exercisedb.p.rapidapi.com/exercises', {
            headers: {
                'X-RapidAPI-Key': 'hidden',
                'X-RapidAPI-Host': 'hidden'
            },
        }).then((response) => {
            console.log(response)
            practices.current = response.data
            dispatch(getPractices(practices.current))
        }).catch(error => {
            toast.error(error)
        })
    }, [dispatch]);




    function moveToNeedHelpComponent() {
        navigate("/*");
    }

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
                        <li onClick={moveToNeedHelpComponent}>need help? contact us</li>
                    </ul>
                </nav>
            </div>
            <Container maxWidth="xl" >
                <CssBaseline />
                <Box sx={{ overflowY: 'auto', marginTop: 8, display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridTemplateRows: '1fr', justifyItems: "center", border: '2px solid blue', paddingTop: '20px' }} >
                    {practices.current.map((practice: IPractice, index: number) => (
                        <PracticeCard key={index} id={practice.id} type={practice.type} location={practice.location}
                            description={practice.description} duration={practice.duration} />
                    ))}
                </Box>
            </Container>
        </div>
    )
}
