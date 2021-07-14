import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const LoginForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErr] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
	const tempUser =
	{
		nickname: firstName,
		email: email,
		password: password,
	}

	axios.post("https://chordeo-grapher.herokuapp.com/user/signup", tempUser)
	.then( response =>
		{
			if(response.data.hasOwnProperty('message'))
			{
				if (response.data.message.length == 43)
				{
					handleClose();
					return;
				}
				setErr(response.data.message);
			}
			else
			{
				handleClose();
			}
			
		}
	)
	.catch( err => console.log("somethings wrong mate"))

  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Nickname"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value, setErr(""))}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value, setErr(""))}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value, setErr(""))}
      />
	  <Typography>{errMsg}</Typography>
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;