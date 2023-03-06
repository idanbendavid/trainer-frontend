import { Button, Container } from '@mui/material';
import { useState } from 'react';
import PublicComplaints from './publicComplaints/publicComplaints';
import UsersListAdmin from './usersListAdmin/userListAdmin';
import AdminTasks from './adminTasks/adminTasks';
import "./adminDashboard.css";

function AdminDashboard() {

    let [showTasks, setShowTasks] = useState(true);
    let [showComplaints, setShowComplaint] = useState(false);
    let [showUsers, setShowUsers] = useState(false);

    return (
        <>
            <div>
                <div className="main-heading main-heading-admin">
                    <h1>Care2Fitness</h1>
                    <p>your goals our mission</p>
                </div>
                <div className='admin-navbar-div'>
                    <nav className='admin-navbar'>
                        <Button color='secondary' variant='contained' onClick={() => { setShowTasks(true); setShowComplaint(false); setShowUsers(false) }}>View Tasks</Button>
                        <Button color='info' variant='contained' onClick={() => { setShowUsers(true); setShowTasks(false); setShowComplaint(false); }}>View Users</Button>
                        <Button color='error' variant='contained' onClick={() => { setShowComplaint(true); setShowTasks(false); setShowUsers(false) }}>View Complaints</Button>
                    </nav>
                </div>
                <div className='admin-data'>
                    <Container maxWidth='xl'>
                        {showUsers &&
                            <UsersListAdmin />
                        }
                        {showComplaints &&
                            <PublicComplaints />
                        }
                        {showTasks &&
                            <AdminTasks />
                        }
                    </Container>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard