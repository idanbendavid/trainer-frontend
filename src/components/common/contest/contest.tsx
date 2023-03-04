import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useAppSelector } from '../../../store';
import "./contest.css";

function Contest() {

    let connectedUser = useAppSelector((state) => state.auth.connectedUser);

    const [contestTableData, setContestTableData] = useState([])

    const columns = [
        { field: '#', headerName: 'Rank', width: 100 },
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'favorites', headerName: 'Favorite Workout', width: 300 },
        { field: 'points', headerName: 'Points', width: 140 },
    ];




    return (
        <div className='contest-component container-fluid'>
            <div className='contest-headline'>
                <h1>beat me</h1>
            </div>
            <div className='contest-table'>
                <DataGrid columns={columns}
                    rows={contestTableData}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    checkboxSelection={true}
                ></DataGrid>
            </div>
        </div>
    )
}

export default Contest