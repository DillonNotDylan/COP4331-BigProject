import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(1),
	
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '300px',
		},
		'& .MuiButtonBase-root': {
			margin: theme.spacing(2),
		},
	},
	title: {
		padding: theme.spacing(0),
	},
}));

const ResetPass = () => {

	const classes = useStyles();
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errMsg, setErr] = useState("");

	const handleChange = (event) => {

		setConfirmPassword(event.target.value);
		
		if (password === event.target.value) {
			setErr("");
		} else {
			setErr("password does not match");
		}
	};

	const handleSubmit = (event) => {
		
		event.preventDefault();

		if (password === confirmPassword)
		{
			;
		} else {

			setErr("BRUH, THESE PASSWORDS DO NOT MATCH!!!");
			return;
		}

		axios.post("https://chordeo-grapher.herokuapp.com/user/change-password",
		{
			token: token,
			password: password,
		})
		.then(function (response) {
			console.log("api call in reset password page");
			console.log(response.data.message);
			setErr("successfully reset password");
		})
		.catch(function (error) {
			console.log("error in api call in account verification page");
			console.log(error);
			setErr("unsuccessfull password reset");
		})
	};

	return (
		<div>
			<h1 className={classes.root}>Chordeographer</h1>
			<h2 className={classes.root}>Password Reset</h2>
			<form className={classes.root} onSubmit={handleSubmit}>
			<TextField
					label="Password"
					variant="filled"
					type="password"
					required
					value={password}
					onChange={e => setPassword(e.target.value, setErr(""))}
				/>
				<TextField
					label="Confirm Password"
					variant="filled"
					type="password"
					required
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Typography>{errMsg}</Typography>
				<div>
					<Button type="submit" variant="contained" color="primary">
						Reset Password
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ResetPass;