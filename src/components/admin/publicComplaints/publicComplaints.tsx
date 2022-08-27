import "./publicComplaints.css";
import { useEffect } from 'react'
import { AppDispatch, useAppSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { deleteUserComplaint, getAllComplaints } from "../../../features/admin/adminSlice";
import { Card } from "@mui/material";
import { IComplaint } from "../../../models/IComplaint";
import ClearIcon from '@mui/icons-material/Clear';

function PublicComplaints() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllComplaints())
    }, [dispatch])

    let publicComplaints = useAppSelector(state => state.admin.publicComplaints)

    function changeBanckgroundColor(category: string): string {
        if (category.toLocaleLowerCase() === 'other') {
            return 'lightgrey'
        }
        if (category.toLocaleLowerCase() === 'articles') {
            return 'lightblue'
        }
        if (category.toLocaleLowerCase() === 'profile') {
            return 'lightgreen'
        }
        if (category.toLocaleLowerCase() === 'exercises') {
            return '#ff4747'
        }
    }


    function deleteComplaintAfterTreatment(complaintId: number) {
        dispatch(deleteUserComplaint(complaintId))
    }


    return (
        <div className="public-complaints">
            <div className="complaint-notes-review">
                <h1>Complaint Explanation</h1>
                <ul>
                    <p>the complaints are ordered by category:</p>
                </ul>
            </div>
            <div className="complaints-grid-split-note-side">
                {publicComplaints.map((complaint: IComplaint, index: number) => {
                    return <Card key={index} className="complaint-notes" style={{ backgroundColor: changeBanckgroundColor(complaint.complaint_category) }}>
                        <div className="clear-icon-div-in-notes" onClick={() => deleteComplaintAfterTreatment(complaint.complaintId)} title={'Delete Complaint'}>
                            <ClearIcon />
                        </div>
                        <h3>Category: {complaint.complaint_category}</h3>
                        <div className="complaint-description">
                            <p><b>Description:</b> {complaint.description}</p>
                        </div>
                        <h4>Name: {complaint.first_name} {complaint.last_name}</h4>
                        <h4>Email: {complaint.email}</h4>
                    </Card>
                })
                }
            </div>
        </div>

    )
}

export default PublicComplaints