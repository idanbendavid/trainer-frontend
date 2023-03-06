import { Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminTasks, newAdminTasks, deleteTask } from '../../../features/admin/adminSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import ClearIcon from '@mui/icons-material/Clear';
import "./adminTasks.css";

function AdminTasks() {

    const dispatch = useDispatch<AppDispatch>();
    let adminTasks = useAppSelector((state) => state.admin.adminTasks);

    let [newTask, setNewTasks] = useState("");

    const getNewTask = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTasks(event.target.value);
    }

    useEffect(() => {
        dispatch(getAdminTasks());
    }, [dispatch]);

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
        <div className='task-list-container'>
            <h3 className='task-list-header'>Admin Tasks</h3>
            <div className='admin-tasks'>
                {adminTasks.map((task: any, index: number) => (
                    <li className='task-item' key={task.taskId}>
                        <ClearIcon className='delete-task-icon' key={index} titleAccess='delete task' onClick={() => deleteAdminTask(task.task)} />
                        {task.task}
                    </li>
                ))}
                <br />
                <label htmlFor="newTasks">New Tasks   </label>
                <input type="text" id='newTasks' onChange={getNewTask} />
                <br /><br />
                <Button variant='contained' onClick={addNewTasks}>create new tasks</Button>
            </div>
        </div>
    )
}

export default AdminTasks