import { Button, Container, Input, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IPractice } from "../../../models/IPractice";
import { UserRole } from "../../../models/role";
import { useAppSelector } from "../../../store";
import "./practicesListAdmin.css";

function PracticesListAdmin() {

    let token = useAppSelector((state) => state.auth.token);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let userRole = useAppSelector((state) => state.auth.connectedUser.userRole);

    const [viewPracticesForms, setViewPracticesForms] = useState(Boolean);

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm<IPractice>();

    const onEditPracticeSubmit: SubmitHandler<IPractice> = (editPractice: IPractice) => {
        // dispatch()
    };

    const onDeletePracticeSubmit: SubmitHandler<IPractice> = (id: IPractice) => {
        // dispatch()
    };

    const [tableData, setTableData] = useState([])

    const columns = [
        { field: 'id', headerName: 'Practice Id', width: 100 },
        { field: 'type', headerName: 'Target', width: 120 },
        { field: 'location', headerName: 'location', width: 120 },
        { field: 'duration', headerName: 'Duration (in minutes)', width: 170 },
        { field: 'desctiption', headerName: 'Description', width: 580 },
    ]


    if (isLoggedIn && userRole === UserRole.Admin) {
        axios.get("http://localhost:3001/practices", {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                setTableData(response.data)
            })
            .catch(error => {
                toast.error(error);
            })
    }

    return (
        <>
            <h1 className="practices-admin-h1">change the way the world is training!</h1>
            <div className="practices-list-admin">
                <Container component="main" maxWidth="lg">
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection />
                </Container>
                <div className="admin-practices-actions">
                    <div className="admin-practices-buttons">
                        {!viewPracticesForms &&
                            <Button variant="contained" color="info" onClick={() => setViewPracticesForms(!viewPracticesForms)}>edit practice form</Button>
                        }
                        {viewPracticesForms &&
                            <Button variant="contained" color="info" onClick={() => setViewPracticesForms(!viewPracticesForms)}>delete practice form</Button>
                        }
                    </div>
                    <div className="admin-practices-form">
                        {viewPracticesForms &&
                            <>
                                <h2>edit practice</h2>
                                <form className="edit-practice-form" onSubmit={handleSubmit(onEditPracticeSubmit)}>
                                    <h4 className="form-instructions">fill all fields in order to edit a practice</h4>
                                    <InputLabel id="editPracticeId">practice Id</InputLabel>
                                    <Input type="number" {...register("id")} />
                                    <InputLabel id="editPracticeType">type</InputLabel>
                                    <Input type="text" {...register("type")} />
                                    <InputLabel id="editPracticeLocation">location</InputLabel>
                                    <Input type="text" {...register("location")} />
                                    <InputLabel id="editPracticeDescription">description</InputLabel>
                                    <Input type="text" {...register("description")} />
                                    <InputLabel id="editPracticeDuration">duration</InputLabel>
                                    <Input type="number" {...register("duration")} />
                                    <br /><br />
                                    <Button type="submit" variant="contained" color="success">Edit</Button>
                                </form>
                            </>
                        }
                        {!viewPracticesForms &&
                            <>
                                <h2>delete practice</h2>
                                <form className="delete-practice-form" onSubmit={handleSubmit(onDeletePracticeSubmit)}>
                                    <h4 className="form-instructions">choose which practice you want to delete</h4>
                                    <InputLabel id="editPracticeId">practice Id</InputLabel>
                                    <Input type="number" {...register("id")} />
                                    <br /><br />
                                    <Button type="submit" variant="contained" color="error">delete </Button>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PracticesListAdmin;
