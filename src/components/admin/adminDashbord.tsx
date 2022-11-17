import { ChangeEvent, useEffect, useState } from 'react';
import PublicComplaints from './publicComplaints/publicComplaints';
import "./adminDashbord.css";
import UsersListAdmin from './usersListAdmin/userListAdmin';
import { AppDispatch, useAppSelector } from '../../store';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getAdminTasks, newAdminTasks, deleteTask } from '../../features/admin/adminSlice';
import ClearIcon from '@mui/icons-material/Clear';

function AdminDashbord() {

    const dispatch = useDispatch<AppDispatch>();

    let name = useAppSelector((state) => state.auth.connectedUser.firstName);
    let isAdmin = useAppSelector((state) => state.auth.connectedUser.userRole);

    let adminTasks = useAppSelector((state) => state.admin.adminTasks);

    let [newTask, setNewTasks] = useState("");

    const getNewTask = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTasks(event.target.value);
    }

    useEffect(() => {
        if (isAdmin) {
            dispatch(getAdminTasks());
        }
    }, [isAdmin, dispatch]);

    function addNewTasks() {
        if (newTask === "" || !newTask) {
            toast.error("task can't be empty");
        }
        dispatch(newAdminTasks(newTask));
    }

    function deleteAdminTask(task: string) {
        let response = dispatch(deleteTask(task))
        if (response) {
            toast.info("task has been deleted");
        }
    }

    return (
        <>
            <div className='admin-dashbord'>
                {isAdmin === 'admin' &&
                    <div className='admin-dashbord-introduction'>
                        <div className="main-heading main-heading-admin">
                            <h1>Core2Fitness</h1>
                            <p>your goals our mission</p>
                        </div>
                        <h1>Welcome {name}</h1>
                        <p className='note-on-small-device'>view users on bigger size screens</p>
                        <div className='task-list-container'>
                            <div className='admin-tasks'>
                                <h3 className='task-list-header'>{name}'s Tasks</h3>
                                {adminTasks.map((task: any, index: number) => (
                                    <li className='task-item' key={task.taskId}>
                                        <ClearIcon className='delete-task-icon' key={index} titleAccess='delete task' onClick={() => deleteAdminTask(task.task)} />
                                        {task.taskId}: {task.task}
                                    </li>
                                ))}
                                <br />
                                <label htmlFor="newTasks">New Tasks   </label>
                                <input type="text" id='newTasks' onChange={getNewTask} />
                                <Button variant='contained' onClick={addNewTasks}>create new tasks</Button>
                            </div>
                        </div>
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