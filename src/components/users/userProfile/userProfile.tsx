import { Container, CssBaseline, Box, InputLabel, Input } from '@mui/material'
import { AppDispatch, useAppSelector } from '../../../store'
import "./userProfile.css";
import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';


function UserProfile() {

    const dispatch = useDispatch<AppDispatch>();

    let user = useAppSelector((state) => state.auth.connectedUser);
    // let token = useAppSelector((state) => state.auth.token);

    // function socketConnection(newEmail: string) {
    //     const socket = io("http://34.65.141.75:8000", { query: { token } }).connect();

    //     socket.on('connection', () => {
    //         // socket.emit('send_data', newEmail)
    //     })
    //     socket.emit("send_data", newEmail)
    // }

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
                    </Box>
                </Container>
            }
        </div>
    )
}

export default UserProfile