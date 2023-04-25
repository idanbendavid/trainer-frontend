import { Dialog, DialogTitle, Button, DialogContent, TextField } from '@mui/material';
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveUserExerciseDetails } from '../../../../features/user/exercises/exerciseSlice';
import { dateHelper } from '../../../../helpers/dateHelper';
import { IUserExerciseDetails } from '../../../../models/IUserExerciseDetails';
import { AppDispatch } from '../../../../store';
import "./saveExerciseForm.css";
import React from 'react';

function SaveExerciseForm(props) {

    const dispatch = useDispatch<AppDispatch>();

    const [openExerciseModal, setOpenExerciseModal] = useState(false);

    const [exerciseName, setExerciseName] = useState(props.exerciseName);

    const [exerciseDateValue, setExerciseDateValue] = useState<Date | null>(null);
    const [numOfSets, setNumOfSets] = useState(1);
    const [numOfRepeats, setNumOfRepeats] = useState(1);
    const [workoutDuration, setWorkoutDuration] = useState(1);
    const [notesChanges, setNotesChange] = useState(String || null);

    const handleSetsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumOfSets(+event.target.value);
    };
    const handleRepeatsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumOfRepeats(+event.target.value);
    };
    const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWorkoutDuration(+event.target.value);
    };
    const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNotesChange(event.target.value);
    };

    useEffect(() => {
        if (exerciseName !== '') {
            setOpenExerciseModal(true);
        } else {
            setOpenExerciseModal(false);
        }
    }, [exerciseName, setOpenExerciseModal])

    const handleClose = () => {
        setOpenExerciseModal(false);
        setExerciseName('');
        props.setShowDialog(false);
    }
    
    const customDayRenderer = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>
    ) => {
        return <PickersDay {...pickersDayProps} sx={{
            [`&&.${pickersDayClasses.selected}`]: {
                backgroundColor: "black",
                cursor: 'not-allowed'
            }
        }} />;
    };

    function saveExerciseDetails() {

        let userExerciseDetails: IUserExerciseDetails = {
            exerciseName,
            type: props.type,
            numberOfSets: numOfSets,
            numberOfRepeats: numOfRepeats,
            notes: notesChanges || null,
            exerciseDate: dateHelper(exerciseDateValue),
            duration: workoutDuration
        }

        dispatch(saveUserExerciseDetails(userExerciseDetails));

        setOpenExerciseModal(false);
        props.setShowDialog(false);
    }

    return (
        <div>
            {openExerciseModal &&
                <Dialog open={openExerciseModal} className='common-dialog'>
                    <DialogTitle className='exercise-dialog-titles'>
                        <div className='exercise-name-dialog-title'>
                            <h1>{exerciseName}</h1>
                        </div>
                        <div className='close-dialog'>
                            <Button onClick={handleClose} className='close-exercise-dialog-button' variant='contained' color='error'>X</Button>
                        </div>
                    </DialogTitle>
                    <DialogContent className='dialog-exercise-content'>
                        <div className='exercise-sets'>
                            <label>How Many Sets?</label>
                            <input type="number" id='setsInput' min={1} defaultValue={1} max={20} onChange={handleSetsChange} />
                        </div>
                        <div className='exercise-repats'>
                            <label>Number Of Repetitions</label>
                            <input type="number" id='repeatsInput' min={1} defaultValue={1} max={100} onChange={handleRepeatsChange} />
                        </div>
                        <div className='exercise-duration'>
                            <label>Workout Duration In Minutes</label>
                            <input type="number" id='repeatsInput' min={1} onChange={handleDurationChange} />
                        </div>
                        <div className='exercise-notes'>
                            <label>Notes</label>
                            <textarea name="workout-notes" cols={30} rows={3} placeholder='write notes about the exercise' onChange={handleNotesChange}></textarea>
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    disableFuture={true}
                                    orientation="landscape"
                                    openTo="day"
                                    label="Date Performed"
                                    renderDay={customDayRenderer}
                                    value={exerciseDateValue}
                                    onChange={(newDateValue) => {
                                        setExerciseDateValue(newDateValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='dialog-exercise-button'>
                            <Button color='success' variant='contained' onClick={saveExerciseDetails}>save details</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

export default SaveExerciseForm