import { Button } from '@mui/material';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getWorkoutVideo } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import "./video.css";

function Video(props) {

    const dispatch = useDispatch<AppDispatch>();
    let exerciseToVideo = `${props.exerciseToVideo} workout`;

    let videoToShow = useAppSelector((state) => state.media.video);
    let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            if (props.exerciseToVideo !== "") {
                dispatch(getWorkoutVideo(exerciseToVideo));
            }
        }
        else {
            toast.info("must be logged in to view asked content");
            return;
        }
    }, [exerciseToVideo, dispatch, isLoggedIn, props])

    return (
        <div className='video-component'>
            {isLoggedIn && videoToShow &&
                <>
                    <iframe className='iframe-video' src={videoToShow.url.replace('watch?v=', 'embed/')} title={videoToShow.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    <div className='enter-contest-div'>
                        <Button color='error' variant='contained'>Enter Contest</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default Video