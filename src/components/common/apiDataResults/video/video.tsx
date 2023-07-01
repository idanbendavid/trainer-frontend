import { Button } from '@mui/material';
import { useEffect, useState, memo, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkoutVideo } from '../../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../../store';
import SaveExerciseForm from '../../forms/saveExercisesForm/saveExerciseForm';
import "./video.css";
import React from 'react';

function Video(props) {

    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    let videoToShow = useAppSelector((state) => state.media.video);
    let query = useAppSelector((state) => state.media.originalQuery);
    const queryWithoutWorkout = query.replace("workout", "");

    const fetchWorkoutVideo = useCallback(() => {
        if (props.exerciseToVideo !== "") {
            if (queryWithoutWorkout.includes(props.exerciseToVideo)) {
                return;
            }
            else {
                dispatch(getWorkoutVideo(`${props.exerciseToVideo} workout`));
            }
        }
    }, [dispatch, props]);

    useEffect(() => {
        fetchWorkoutVideo();
    }, [fetchWorkoutVideo])

    return (
        <div className='video-component'>
            {videoToShow.url &&
                <>
                    <iframe className='iframe-video' src={videoToShow.url.replace('watch?v=', 'embed/')} title={videoToShow.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    <div className='save-exercise-div'>
                        <Button color='error' variant='contained' onClick={() => setShowDialog(true)}>Done this Exercise?</Button>
                    </div>
                </>
            }
            {showDialog &&
                <SaveExerciseForm exerciseName={props.exerciseToVideo} type={props.type} setShowDialog={setShowDialog} />
            }
        </div>
    )
}

export default memo(Video)