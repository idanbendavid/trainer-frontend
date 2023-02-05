import { Button, Dialog } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { getImageOfMuscle, resetImage } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import "./dataDialog.css";

function DataDialogs(props) {

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openInstructionsModal, setOpenInstructionsModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  let image = useAppSelector((state) => state.media.image);

  let muscle = props.muscle;
  let instructions = props.instructions;
  let name = props.name;

  useEffect(() => {
    if (muscle !== undefined) {
      dispatch(getImageOfMuscle(muscle));
    }
    
    if (image) {
      setOpenImageModal(true);
      setOpenInstructionsModal(false);
    }
    
    if (instructions !== undefined) {
      setOpenInstructionsModal(true);
      setOpenImageModal(false);
    }

  }, [dispatch, muscle, image, instructions])

  const handleClose = () => {
    dispatch(resetImage());
    instructions = undefined;
    setOpenImageModal(false);
    setOpenInstructionsModal(false);
  };

  return (
    <div className='data-dialogs'>
      {(openImageModal || openInstructionsModal) &&
        <Dialog open={openImageModal || openInstructionsModal} className='common-dialog'>
          <DialogTitle className='common-dialog-titles'>
            {name}
            <Button onClick={handleClose} className='close-dialog'>X</Button>
          </DialogTitle>
          {openImageModal && !openInstructionsModal &&
            <DialogContent className='dialog-muscle-content'>
              <LazyLoadImage src={image} alt="muscle" className='muscle-image' />
            </DialogContent>
          }
          {openInstructionsModal && !openImageModal &&
            <DialogContent className='instructions-dialog-content'>
              <p className='dialog-instructions'>{instructions}</p>
            </DialogContent>
          }
        </Dialog>
      }
    </div>
  )
}

export default DataDialogs