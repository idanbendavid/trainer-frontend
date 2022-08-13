import { Container, CssBaseline, Box, InputLabel, Input, Button } from '@mui/material'
import { ChangeEvent, useState } from 'react';
import { changeUserEmail as updateUserEmail } from '../../../features/userData/userDataSlice';
import { useAppSelector } from '../../../store'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./userProfile.css";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


function UserProfile() {

    const dispatch = useDispatch();
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(Boolean);
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    let user = useAppSelector((state) => state.auth.connectedUser);

    const oldEmailVerification = (event: ChangeEvent<HTMLInputElement>) => {
        setOldEmail(event.target.value);
    }

    const updatedEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    }


    function updateEmailAddressOfUser() {
        if (oldEmail !== user.email) {
            toast.error("old email address does not match");
            return;
        }

        if (newEmail) {
            dispatch(updateUserEmail(newEmail))
        }

        setIsChangeEmailModalOpen(false);
    }

    return (
        <div className="user-profile">
            {user &&
                <Container component="main" maxWidth="sm">
                    <Box sx={{ marginTop: 10, marginBottom: 2 }}>
                        <CssBaseline />
                        <h2 className='user-profile-user-name-display'>{user.firstName}'s prfolie</h2>

                        <div className='user-profile-details'>
                            <div className='user-profile-details-part1'>
                                <div className='user-profile-first-name'>
                                    <InputLabel>First Name</InputLabel>
                                    <Input type="text" disabled={true} value={user.firstName} />
                                </div>
                                <br />
                                <div className='user-profile-email'>
                                    <InputLabel>Email</InputLabel>
                                    <Input type="email" disabled={true} value={user.email} />
                                </div>
                                <br />
                                <div className='user-profile-status'>
                                    <InputLabel>status</InputLabel>
                                    <Input type="text" disabled={true} value={user.userRole} />
                                </div>
                            </div>

                            <div className='user-profile-details-part2'>
                                <div className='user-profile-last-name'>
                                    <InputLabel>Last Name</InputLabel>
                                    <Input type="text" disabled={true} value={user.lastName} />
                                </div>
                                <br />
                                <div className='user-profile-birth-date'>
                                    <InputLabel>Birth Date</InputLabel>
                                    <Input type="date" disabled={true} value={user.birthDate} />
                                </div>
                                <br />
                            </div>
                        </div>
                        <br />
                        <div className='user-profile-buttons'>
                            <div className='change-email-button'>
                                <Button type="submit" variant="contained" color='success' sx={{ mt: 2, mb: 2 }} onClick={() => setIsChangeEmailModalOpen(true)}>change email</Button>
                            </div>
                            <div className='update-profile-button'>
                                <Button type="submit" variant="contained" color='info' sx={{ mt: 2, mb: 2 }} >update profile</Button>
                            </div>
                        </div>
                    </Box>
                </Container>
            }

            <Dialog open={isChangeEmailModalOpen} onClose={updateEmailAddressOfUser} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" className='dialog-header'>
                    <Button color="error" variant='contained' id="closeModalButton" onClick={() => setIsChangeEmailModalOpen(false)}>X</Button>
                    <h3>
                        updating {user.firstName}'s email
                    </h3>
                </DialogTitle>
                <DialogContent>
                    <div id="alert-dialog-description">
                        enter old email address
                        <Input id="name" placeholder="old Email Address" type="email" fullWidth onChange={oldEmailVerification} />
                        <br /><br />
                        enter new email address
                        <Input id="name" placeholder="new Email Address" type="email" fullWidth onChange={updatedEmail} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateEmailAddressOfUser}>update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserProfile