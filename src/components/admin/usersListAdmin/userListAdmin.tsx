import { Button, Container, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser as deleteUserFromServer } from "../../../features/admin/adminSlice";
import { UserRole } from "../../../models/role";
import adminService from "../../../services/adminService";
import { useAppSelector } from "../../../store";
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
        </div>
    );
}

export default UsersListAdmin;
