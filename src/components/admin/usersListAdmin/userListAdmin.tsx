import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser as deleteUserFromServer } from "../../../features/admin/adminSlice";
import { UserRole } from "../../../models/role";
import adminService from "../../../services/adminService";
import { AppDispatch, useAppSelector } from "../../../store";
import "./userListAdmin.css";

function UsersListAdmin() {

    const dispatch = useDispatch<AppDispatch>();

    let token = useAppSelector((state) => state.auth.token);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let userRole = useAppSelector((state) => state.auth.connectedUser.userRole);

    const [tableData, setTableData] = useState([])
    const [deleteUserData, setDeleteUserData] = useState([]);
    const [deleteConfarmation, setDeleteConfirmation] = useState(false);
    const [showSelectionModel, setShowSelectionModel] = useState(false);

    const columns = [
        { field: 'id', headerName: 'User Id', width: 100 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'birth_date', headerName: 'Birth Date', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
    ]

    async function getAllUsers() {
        const response = await adminService.getAllUserForAdmin();
        setTableData(response)
    }

    useEffect(() => {
        if (isLoggedIn && userRole === UserRole.Admin) {
            getAllUsers();
        }
    }, [isLoggedIn, userRole, token])


    function startOfDeleteUserProcess() {
        setShowSelectionModel(true);
        toast.info("please select the user you want to delete");
    }

    function completeUserDeletion() {
        if (deleteUserData) {
            dispatch(deleteUserFromServer(deleteUserData[0].id));
            setDeleteConfirmation(false);
            setShowSelectionModel(false);
            setTableData(tableData.filter((user) => user.id !== deleteUserData[0].id));
            deleteUserData.splice(0, deleteUserData.length)
        }
        deleteUserData.splice(0, deleteUserData.length)
        setDeleteConfirmation(false);
        setShowSelectionModel(false);
    }

    function cancelUserDeletion() {
        deleteUserData.splice(0, deleteUserData.length)
        setDeleteConfirmation(false);
        toast.info("delete user was cancelled")
    }


    return (
        <div className="user-list-admin-component">
            <h1 className="users-admin-h1">signed users</h1>
            <div className="users-list-admin">
                <div className="delete-user-button">
                    <Button variant="contained" color="error" onClick={startOfDeleteUserProcess}>Delete User</Button>
                </div>
                <Container component="main" maxWidth="md">
                    <DataGrid
                        autoHeight
                        rows={tableData}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection={showSelectionModel}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = tableData.filter((tableData) =>
                                selectedIDs.has(tableData.id)
                            );
                            setDeleteConfirmation(true);
                            setDeleteUserData(selectedRowData);
                        }}
                    />
                </Container>
            </div>
            {deleteUserData.length > 0 && deleteConfarmation &&
                <Dialog open={deleteConfarmation} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <h3>are you sure you want to delete the selected user?</h3>
                    </DialogContent>
                    <DialogActions className="user-deletion-selection">
                        <Button onClick={completeUserDeletion}>Yes</Button>
                        <Button onClick={cancelUserDeletion}>No</Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    );
}

export default UsersListAdmin;
