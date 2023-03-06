import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkoutVideo } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import DataDialogs from '../dataDialogs/dataDialog';
import "./video.css";

function Video(props) {

    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    let videoToShow = useAppSelector((state) => state.media.video);

    useEffect(() => {
        if (props.exerciseToVideo !== null) {
            dispatch(getWorkoutVideo(`${props.exerciseToVideo} workout`));
        }
    }, [props, dispatch])

    function resetOpenDialogProps(){
        setShowDialog(false);
    }

    return (
        <div className='video-component'>
            {videoToShow.url &&
                <>
                    <iframe className='iframe-video' src={videoToShow.url.replace('watch?v=', 'embed/').replace('youtube', 'youtube-nocookie')} title={videoToShow.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    <div className='enter-contest-div'>
                        <Button color='error' variant='contained' onClick={() => setShowDialog(true)}>Done this Exercise?</Button>
                    </div>
                </>
            }
            {showDialog && 
                <DataDialogs exerciseName={props.exerciseToVideo} type={props.type} resetOpenDialogProps={resetOpenDialogProps}/> 
            }
        </div>
    )
}

export default Video