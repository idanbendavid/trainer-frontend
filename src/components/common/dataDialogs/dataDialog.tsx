import { Button, Dialog, TextField } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider, PickersDay, pickersDayClasses, PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ChangeEvent, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { getImageOfMuscle, resetImage } from '../../../features/media/mediaSlice';
import { saveUserExerciseDetails } from '../../../features/user/exercises/exerciseSlice';
import { IUserExerciseDetails } from '../../../models/IUserExerciseDetails';
import { AppDispatch, useAppSelector } from '../../../store';
import { dateHelper } from "../../../helpers/dateHelper";
import "./dataDialog.css";

function DataDialogs(props) {

  const dispatch = useDispatch<AppDispatch>();

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);

  const [exerciseName, setExerciseName] = useState(props.exerciseName || '');

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

  let image = useAppSelector((state) => state.media.image);

  let muscle = props.muscle;

  useEffect(() => {
    if (muscle) {
      dispatch(getImageOfMuscle(muscle));
    }

    if (image) {
      setOpenImageModal(true);
    }

    if (exerciseName !== '') {
      setOpenExerciseModal(true);
    } else {
      setOpenExerciseModal(false);
    }

  }, [dispatch, muscle, image, exerciseName, props])

  const handleClose = () => {
    dispatch(resetImage());
    setOpenImageModal(false);
    setOpenExerciseModal(false);
    setExerciseName('');
    props.resetOpenDialogProps();
  };

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
    props.resetOpenDialogProps();

  }

  return (
    <div className='data-dialogs'>
      {openImageModal &&
        <Dialog open={openImageModal} className='common-dialog'>
          <DialogTitle className='common-dialog-titles'>
            <div className='close-dialog'>
              <Button onClick={handleClose} className='close-muscle-dialog-button' variant='contained' color='error'>X</Button>
            </div>
          </DialogTitle>
          <DialogContent className='dialog-muscle-content'>
            <LazyLoadImage src={image} alt="muscle" className='muscle-image' />
          </DialogContent>
        </Dialog>
      }
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

export default DataDialogs