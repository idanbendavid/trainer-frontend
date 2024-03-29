import { Box, Button, Collapse, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getExerciseOfUser } from '../../../features/user/exercises/exerciseSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import './userExercises.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

function UserExercises() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let userExercises = useAppSelector((state) => state.exercise.userExercises);

  useEffect(() => {

    dispatch(getExerciseOfUser())

  }, [dispatch])

  function Row(props) {
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>{props.singleExercise.exerciseName}</TableCell>
          <TableCell>{props.singleExercise.type.replace("_", " ")}</TableCell>
          <TableCell id='dateRowCell'>{props.singleExercise.exerciseDate}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row"
              size="small" onClick={() => setOpen(!open)}> {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <Collapse in={open} unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <TableRow>
                <TableCell>Sets</TableCell>
                <TableCell>Repeats</TableCell>
                <TableCell>notes</TableCell>
                <TableCell>Duration (minutes)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{props.singleExercise.numberOfSets}</TableCell>
                <TableCell>{props.singleExercise.numberOfRepeats}</TableCell>
                <TableCell>{props.singleExercise.notes}</TableCell>
                <TableCell>{props.singleExercise.duration}</TableCell>
              </TableRow>
            </Box>
          </Collapse>
        </TableRow>
      </React.Fragment>
    );
  }


  return (
    <div className='user-exercises'>
      <Container maxWidth='lg'>
        {!userExercises.length &&
          <h1 className='no-user-exercises'>you did not complete any exercises<br/>trust us is worth your time</h1>
        }
        {userExercises.length > 0 &&
          <>
          <h1 className='user-exercise-heading'>Previously Done Exercises</h1>
            <TableContainer component={Paper} style={{ overflowY: 'auto', maxHeight: 500,}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell id='typeHeadCell'>Type</TableCell>
                    <TableCell id='dateHeadCell'>Date</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userExercises.map((singleExercise, index) => {
                    return <Row key={index} singleExercise={singleExercise} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }
      </Container>
    </div>
  )
}

export default UserExercises