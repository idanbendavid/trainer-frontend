import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { UserRole } from "../../../models/role";
import adminService from "../../../services/adminService";
import { useAppSelector } from "../../../store";
import "./userListAdmin.css";
import React from "react";

function UsersListAdmin() {

    let token = useAppSelector((state) => state.auth.connectedUser.token);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let userRole = useAppSelector((state) => state.auth.connectedUser.userRole);

    const [tableData, setTableData] = useState([])
    const columns = [
        { field: 'id', headerName: 'id', width: 100 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'birthDate', headerName: 'Birth Date', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
    ]

    async function getAllUsers() {
        const response = await adminService.getAllUsersForAdmin();
        setTableData(response)
    }

    useEffect(() => {
        if (isLoggedIn && userRole === UserRole.Admin) {
            getAllUsers();
        }
    }, [isLoggedIn, userRole, token])

    return (
        <div className="user-list-admin-component">
            <h1 className="users-admin-h1">signed users</h1>
            <div className="users-list-admin">
                <Container component="main" maxWidth="md">
                    <DataGrid
                        autoHeight
                        rows={tableData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Container>
            </div>
        </div>
    );
}

export default UsersListAdmin;
