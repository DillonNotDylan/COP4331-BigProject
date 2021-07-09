import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ModalDialog from './ModalDialog';

const Login_SignUp = () => {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Login-SignUp" style={{textAlign: 'center', paddingTop: 25}}>
      <Button variant="contained" color="secondary" onClick={handleOpen}>Save Progression and Signup</Button>
      <ModalDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default Login_SignUp;