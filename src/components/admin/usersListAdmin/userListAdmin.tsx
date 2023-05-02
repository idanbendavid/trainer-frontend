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

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (isLoggedIn && userRole === UserRole.Admin) {
            getAllUsers();
        }
    }, [isLoggedIn, userRole, token])

    async function getAllUsers() {
        const response = await adminService.getAllUsersForAdmin();
        setTableData(response)
    }

    function setTableColumns() {

        let columns = [
            { field: 'id', headerName: 'id', flex: 0.5 },
            { field: 'firstName', headerName: 'First Name', flex: 1 },
            { field: 'lastName', headerName: 'Last Name', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
            { field: 'birthDate', headerName: 'Birth Date', flex: 1 },
        ];

        if (window.innerWidth > 600 && window.innerWidth < 750) {
            let medCols = columns.slice(0, 4);
            return medCols;
        }
        if (window.innerWidth < 600) {
            let smCols = columns.slice(1, 4);
            return smCols;
        }
        return columns;
    }

    return (
        <div className="user-list-admin-component">
            <h1 className="users-admin-h1">signed users</h1>
            <div className="users-list-admin">
                <Container component="main" maxWidth="md">
                    <DataGrid
                        autoHeight
                        rows={tableData}
                        columns={setTableColumns()}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Container>
            </div>
        </div>
    );
}

export default UsersListAdmin;
