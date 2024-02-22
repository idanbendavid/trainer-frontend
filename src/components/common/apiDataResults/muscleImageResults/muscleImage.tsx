import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { getImageOfMuscle } from '../../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../../store';
import "./muscleImage.css";
import React from 'react';

function MuscleImage(props) {

  const dispatch = useDispatch<AppDispatch>();

  const [showMuscleImage, setShowMuscleImage] = useState(false);

  let image = useAppSelector((state) => state.media.image);

  let muscle = props.muscle;

  useEffect(() => {     
    if (muscle) {
      dispatch(getImageOfMuscle(muscle));
    }
    
    if (image) {
      setShowMuscleImage(true);
    }
  }, [dispatch, muscle, image])

  return (
    <>
      {showMuscleImage &&
        <div className='muscle-image-div'>
          <LazyLoadImage src={image} alt="muscles" className='muscle-image' />
        </div>
      }
    </>
  )
}

export default MuscleImage