import { Button, Card, Dialog, DialogContent, DialogTitle, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getExercisesOfUser, deleteExerciseOfUser } from '../../../features/exercises/exerciseSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./userExercises.css"

function UserExercise() {

  const dispatch = useDispatch<AppDispatch>();
  const [checkStatusModal, setCheckStatusModal] = useState(Boolean);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

  let userExercises = useAppSelector((state) => state.exercises.userExercises);
  let firstName = useAppSelector((state) => state.auth.connectedUser.firstName);

  useEffect(() => {

    dispatch(getExercisesOfUser())
  }, [dispatch])

  function checkExerciseStatus(exerciseOfUser) {
    setCheckStatusModal(true);
    setExerciseToDelete(exerciseOfUser)
  }

  function deleteExerciseFromUserSchedule() {
    let exerciseId = exerciseToDelete.exercise_id

    dispatch(deleteExerciseOfUser(exerciseId));
    setCheckStatusModal(false);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesOfUserPerPage: number = 8;

  const indexOfLastUserExercise: number = currentPage * exercisesOfUserPerPage;

  const indexOfFirstUserExercise: number = indexOfLastUserExercise - exercisesOfUserPerPage;

  const currentUserExercises = userExercises.slice(indexOfFirstUserExercise, indexOfLastUserExercise)

  const paginate = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <div className='user-exercise'>
      <div className='user-exercise-grid-split'>
        <h1 className='exercise-header'>{firstName}'s exercises</h1>
        <div className='single-exercise-detailed'>
          {currentUserExercises.map((exerciseOfUser: any, index: number) => {
            return <Card className="user-exercise-display" key={index}>
              <LazyLoadImage src={exerciseOfUser.gifUrl} alt="exercise" />
              <div>
                <p className='user-exercises-exercise-name'>{exerciseOfUser.name}</p>
                <p>{exerciseOfUser.target}</p>
              </div>
              <div>
                <p>{exerciseOfUser.bodyPart}</p>
                <p>{exerciseOfUser.equipment}</p>
                <p>{exerciseOfUser.exerciseDate}</p>
              </div>
              <div className='actions-new-button'>
                <Button variant='contained' onClick={() => checkExerciseStatus(exerciseOfUser)}>Was it done?</Button>
              </div>
            </Card>
          })}
        </div>
        <Stack display={'flex'} alignItems={'center'} >
          {userExercises.length > exercisesOfUserPerPage &&
            < Pagination color='primary'
              shape='circular'
              count={Math.ceil(userExercises.length / exercisesOfUserPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          }
        </Stack>
      </div>
      {checkStatusModal &&
        <div >
          <Dialog open={checkStatusModal} onClose={(reason: "backdropClick" | "escapeKeyDown") => setCheckStatusModal(false)} maxWidth='xs'>
            <DialogTitle>
              have you completed this exercise?
            </DialogTitle>
            <DialogContent>
              <div className='check-exercise-status-dialog'>
                <Button variant='contained' color='success' onClick={deleteExerciseFromUserSchedule}>Yes</Button>
                <Button variant='contained' color='error' onClick={() => setCheckStatusModal(false)}>No</Button>
              </div>
              <h3>*By clicking Yes the exercise you selected will be deleted from your schdule</h3>
            </DialogContent>
          </Dialog>
        </div>
      }
    </div>
  )
}

export default UserExercise