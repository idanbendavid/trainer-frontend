import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkoutVideo } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import "./video.css";

function Video(props) {

    const dispatch = useDispatch<AppDispatch>();
    let exerciseToVideo = `${props.exerciseToVideo} workout`;

    let videoToShow = useAppSelector((state) => state.media.video);

    useEffect(() => {
        if (exerciseToVideo !== undefined) {
            dispatch(getWorkoutVideo(exerciseToVideo));
        }
    }, [exerciseToVideo, dispatch])

    return (
        <div className='video-component'>
            {videoToShow &&
                <iframe className='iframe-video' src={videoToShow.url.replace('watch?v=', 'embed/')} title={videoToShow.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            }
        </div>
    )
}

export default Video