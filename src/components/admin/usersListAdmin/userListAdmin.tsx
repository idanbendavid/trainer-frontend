import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserRole } from "../../../models/role";
import { useAppSelector } from "../../../store";
import { deleteUser as deleteUserFromServer } from "../../../features/admin/adminSlice";
import "./userListAdmin.css";

function UsersListAdmin() {

    const dispatch = useDispatch();

    let token = useAppSelector((state) => state.auth.token);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    let userRole = useAppSelector((state) => state.auth.connectedUser.userRole);

    const [tableData, setTableData] = useState([])
    const [deleteConfarmation, setDeleteConfarmation] = useState(Boolean);
    const [deleteUserData, setDeleteUserData] = useState([]);

    const columns = [
        { field: 'id', headerName: 'User Id', width: 100 },
        { field: 'first_name', headerName: 'First Name', width: 150 },
        { field: 'last_name', headerName: 'Last Name', width: 150 },
        { field: 'birth_date', headerName: 'Birth Date', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'user_role', headerName: 'User Role', width: 170 },
    ]

    useEffect(() => {
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
    }, [isLoggedIn, userRole, token])


    function completeUserDeletion() {
        if (deleteUserData) {
            dispatch(deleteUserFromServer(deleteUserData[0].id))
            setDeleteConfarmation(false);
        }
        setDeleteConfarmation(false);
        deleteUserData.splice(0, deleteUserData.length)
    }

    function cancelUserDeletion() {
        deleteUserData.splice(0, deleteUserData.length)
        setDeleteConfarmation(false);
        toast.info("delete user was cancelled")
    }


    return (
        <>
            <h1 className="users-admin-h1">signed users</h1>
            <div className="users-list-admin">
                <div className="users-admin-actions">
                    <div className="delete-user">
                        <h2 className="users-admin-heading">delete user</h2>
                        <h3>In order to delete a specific user please mark the row that presents the user details</h3>
                    </div>
                </div>
                <Container component="main" maxWidth="lg">
                    <DataGrid
                        rows={tableData}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRowData = tableData.filter((tableData) =>
                                selectedIDs.has(tableData.id),
                            );
                            setDeleteConfarmation(true);
                            setDeleteUserData(selectedRowData);
                        }} />
                </Container>
            </div>
            {deleteConfarmation &&
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
        </>
    );
}

export default UsersListAdmin;
