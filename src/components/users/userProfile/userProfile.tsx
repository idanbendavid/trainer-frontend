import { Container, CssBaseline, Box, InputLabel, Input, Button } from '@mui/material'
import { useAppSelector } from '../../../store'
import "./userProfile.css";


function UserProfile() {

    let user = useAppSelector((state) => state.auth.connectedUser);
    
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
                                    <Input type="datetime" disabled={true} value={user.birthDate} />
                                </div>
                                <br />
                                <div className='user-profile-coach-id'>
                                    <InputLabel>coach Id</InputLabel>
                                    <Input type="text" disabled={true} value={user.coachId} />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='user-profile-buttons'>
                            <div className='change-email-button'>
                                <Button type="submit" variant="contained" color='success' sx={{ mt: 2, mb: 2 }} >change email</Button>
                            </div>
                            <div className='change-password-button'>
                                <Button type="submit" variant="contained" color='warning' sx={{ mt: 2, mb: 2 }} >reset password</Button>
                            </div>
                            <div className='update-profile-button'>
                                <Button type="submit" variant="contained" color='info' sx={{ mt: 2, mb: 2 }} >update profile</Button>
                            </div>
                        </div>
                    </Box>
                </Container>
            }
        </div>
    )
}

export default UserProfile