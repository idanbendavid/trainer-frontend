import { Button, Container, Input, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserRole } from "../../../models/role";
import { useAppSelector } from "../../../store";
import "./userListAdmin.css";

function UsersListAdmin() {

    let token = useAppSelector((state) => state.auth.token);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let userRole = useAppSelector((state) => state.auth.connectedUser.userRole);


    const [viewDeleteForm, setViewDeleteForm] = useState(Boolean);

    const [tableData, setTableData] = useState([])

    const columns = [
        { field: 'id', headerName: 'User Id', width: 100 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'birth_date', headerName: 'Birth Date', width: 230 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'user_role', headerName: 'User Role', width: 170 },
        { field: 'coach_id', headerName: 'Coach Id', width: 300 }
    ]

    if (isLoggedIn && userRole === UserRole.Admin) {
        axios.get("http://localhost:3001/users/allUsers", {
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
            <h1 className="users-admin-h1">signed users</h1>
            <div className="users-list-admin">
                <Container component="main" maxWidth="xl">
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection />
                </Container>
                <div className="users-admin-actions">
                    <div className="users-admin-buttons">
                        {viewDeleteForm &&
                            <Button variant="contained" color="info" onClick={() => setViewDeleteForm(!viewDeleteForm)}>delete coach form</Button>
                        }
                        {!viewDeleteForm &&
                            <Button variant="contained" color="info" onClick={() => setViewDeleteForm(!viewDeleteForm)}>delete user form</Button>
                        }
                    </div>
                    {viewDeleteForm &&
                        <div className="delete-user">
                            <h2 className="users-admin-heading">delete user</h2>
                            <form className="delete-user-form">
                                <h4>choose which user to delete</h4>
                                <InputLabel id="userId">User Id</InputLabel>
                                <Input type="number" />
                                <br /><br />
                                <Button type="submit" variant="contained" color="error">delete</Button>
                            </form>
                        </div>
                    }
                    {!viewDeleteForm &&
                        <div className="delete-coach">
                            <h2 className="users-admin-heading">delete coach</h2>
                            <form className="delete-coach-form">
                                <h4>choose which coach to delete</h4>
                                <InputLabel id="userId" >User Id</InputLabel>
                                <Input type="number" />
                                <br /><br />
                                <InputLabel id="coachId">Coach Id</InputLabel>
                                <Input type="text" id="coachIdInput" />
                                <br /><br />
                                <Button type="submit" variant="contained" color="error">delete</Button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default UsersListAdmin;
