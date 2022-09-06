import React from 'react'
import PublicComplaints from './publicComplaints/publicComplaints'
import "./adminDashbord.css"
import UsersListAdmin from './usersListAdmin/userListAdmin'
import { useAppSelector } from '../../store'

function AdminDashbord() {

    let name = useAppSelector((state) => state.auth.connectedUser.firstName);
    let isAdmin = useAppSelector((state) => state.auth.connectedUser.userRole);

    return (
        <>
            <div className='admin-dashbord'>
                {isAdmin === 'admin' &&
                    <div className='admin-dashbord-introduction'>
                        <h1>Welcome {name}</h1>
                    </div>
                }
                <div className='admin-component-diversion'>
                    <UsersListAdmin />
                    <PublicComplaints />
                </div>
            </div>
        </>
    )
}

export default AdminDashbord