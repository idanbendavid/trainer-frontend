import { Container, CssBaseline, Box, InputLabel, Input } from '@mui/material'
import { AppDispatch, useAppSelector } from '../../../store'
import "./userProfile.css";
import { useDispatch } from 'react-redux';
import React from 'react';
// import { io } from 'socket.io-client';


function UserProfile() {

    const dispatch = useDispatch<AppDispatch>();

    let user = useAppSelector((state) => state.auth.connectedUser);
    // let token = useAppSelector((state) => state.auth.token);

    // function socketConnection(newEmail: string) {
    //     const socket = io("http://localhost:8000", { query: { token } }).connect();

    //     socket.on('connection', () => {
    //         // socket.emit('send_data', newEmail)
    //     })
    //     socket.emit("send_data", newEmail)
    // }

    return (
        <div className="user-profile">
            {user &&
                <Container component="main">
                    <Box sx={{ marginTop: 10, marginBottom: 2 }}>
                        <CssBaseline />
                        <h2 className='user-profile-user-name-display'>{user.firstName}'s prfolie</h2>

                        <div className='user-profile-details'>
                            <div className='user-profile-first-name'>
                                <InputLabel id='userProfileLabels'>First Name</InputLabel>
                                <Input type="text" readOnly={true} value={user.firstName} />
                            </div>
                            <br />
                            <div className='user-profile-last-name'>
                                <InputLabel id='userProfileLabels'>Last Name</InputLabel>
                                <Input type="text" readOnly={true} value={user.lastName} />
                            </div>
                            <br />
                            <div className='user-profile-status'>
                                <InputLabel id='userProfileLabels'>status</InputLabel>
                                <Input type="text" readOnly={true} value={user.userRole} />
                            </div>
                            <br />
                            <div className='user-profile-email'>
                                <InputLabel id='userProfileLabels'>Email</InputLabel>
                                <Input type="email" readOnly={true} value={user.email} />
                            </div>
                            <br />
                            <div className='user-profile-birth-date'>
                                <InputLabel id='userProfileLabels'>Birth Date</InputLabel>
                                <Input type="date" readOnly={true} value={user.birthDate} />
                            </div>
                        </div>
                    </Box>
                </Container>
            }
        </div>
    )
}

export default UserProfile