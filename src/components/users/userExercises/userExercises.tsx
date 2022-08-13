import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExercisesOfUser } from '../../../features/exercises/exerciseSlice';
import { useAppSelector } from '../../../store'
import "./userExercises.css"

function UserExercise() {

  const dispatch = useDispatch<any>();

  // let user = useAppSelector((state) => state.auth.connectedUser);
  let userExercises = useAppSelector((state) => state.exercises.userExercises)
  const [tableData, setTableData] = useState([])

  const columns = [
    { field: 'exercise_id', headerName: 'Exercise Id', width: 150 },
    { field: 'bodyPart', headerName: 'Body Part', width: 150 },
    { field: 'equipment', headerName: 'Equipment', width: 150 },
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'target', headerName: 'Target', width: 200 },
    { field: 'exerciseDate', headerName: 'Exercise Date', width: 200 },
  ]


  useEffect(() => {

    dispatch(getExercisesOfUser())
    setTableData(userExercises)
  }, [dispatch, userExercises])


  return (
    <div className='user-exercise'>
      <div className='inspire-quets'>
        <h1>hard work dedication never quiting and you're looking at a champion</h1>
      </div>
      <div className='user-exercise-grid-split'>
        <div className='user-exercises-list'>
          <DataGrid
            autoHeight
            autoPageSize={true}
            rows={tableData}
            columns={columns}
            getRowId={(row) => row.exercise_id}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = tableData.filter((tableData) =>
                selectedIDs.has(tableData.exercise_id)
              );
              console.log(selectedRowData)
            }} />
        </div>
        <div className='single-exercise-detailed'>
        </div>

      </div>
    </div>
  )
}

export default UserExercise