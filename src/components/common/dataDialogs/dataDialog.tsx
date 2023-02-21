import { Button, Dialog } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getImageOfMuscle, resetImage } from '../../../features/media/mediaSlice';
import { AppDispatch, useAppSelector } from '../../../store';
import "./dataDialog.css";

function DataDialogs(props) {

  const [openImageModal, setOpenImageModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  let image = useAppSelector((state) => state.media.image);
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  let muscle = props.muscle;

  useEffect(() => {
    if(isLoggedIn){
      if (muscle !== "") {
        dispatch(getImageOfMuscle(muscle));
      }
    }
    else{
      toast.info("must be logged in to view asked content");
      return
    }

    if (image) {
      setOpenImageModal(true);
    }
  }, [dispatch, muscle, image, isLoggedIn])

  const handleClose = () => {
    dispatch(resetImage());
    setOpenImageModal(false);
  };

  return (
    <div className='data-dialogs'>
      {isLoggedIn && openImageModal &&
        <Dialog open={openImageModal} className='common-dialog'>
          <DialogTitle className='common-dialog-titles'>
            <div className='close-dialog'>
              <Button onClick={handleClose} className='close-dialog-button' variant='text'>X</Button>
            </div>
          </DialogTitle>
          {openImageModal &&
            <DialogContent className='dialog-muscle-content'>
              <LazyLoadImage src={image} alt="muscle" className='muscle-image' />
            </DialogContent>
          }
        </Dialog>
      }
    </div>
  )
}

export default DataDialogs