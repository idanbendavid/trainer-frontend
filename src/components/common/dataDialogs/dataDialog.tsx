import { Button, Dialog } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { getImageOfMuscle, reset as resetMediaSliceState } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import "./dataDialog.css";

function DataDialogs(props) {

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openInstructionsModal, setOpenInstructionsModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  let image = useAppSelector((state) => state.media.image);

  let instructions = props.instructions;

  useEffect(() => {
    dispatch(getImageOfMuscle(props.muscle));

    if (image) {
      setOpenImageModal(true);
      setOpenInstructionsModal(false);
      props.muscle = "";
    }

    if (instructions) {
      setOpenInstructionsModal(true);
      setOpenImageModal(false);
    }

  }, [dispatch, props, image, instructions])

  const handleClose = () => {
    dispatch(resetMediaSliceState());
    setOpenImageModal(false);
    setOpenInstructionsModal(false);
  };

  return (
    <div className='data-dialogs'>
      {openImageModal && 
        <Dialog open={openImageModal} className='dialog-muscle-image'>
          <DialogTitle className='dialog-title-muscle-image'>
            <Button onClick={handleClose} className='close-muscle-dialog'>X</Button>
          </DialogTitle>
          <DialogContent className='dialog-muscle-content'>
            <LazyLoadImage src={image} alt="muscle" />
          </DialogContent>
        </Dialog>
      }
      {openInstructionsModal &&
        <Dialog open={openInstructionsModal} className='instrction-dialog'>
          <DialogTitle className='instructions-title-dialog'>
            <Button onClick={handleClose} className='instructions-close-dialog'>X</Button>
          </DialogTitle>
          <DialogContent className='instructions-dialog-content'>
            <p>{instructions}</p>
          </DialogContent>
        </Dialog>
      }
    </div>
  )
}

export default DataDialogs