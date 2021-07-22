import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing(1),
	},
}));

const VerificationPage = () => {

	const classes = useStyles();
	const { token } = useParams();
	const [message, setMessage] = useState("");

	useEffect(() => {

		axios.get(`https://chordeo-grapher.herokuapp.com/user/verify-email/${token}`)
		.then(function (response) {
			console.log("api call in email verification page");
			console.log(response.data);
			setMessage(response.data.message);
		})
		.catch(function (error) {
			console.log("error in api call in email verification page");
			console.log(error);
		})

	}, [])

	return (
		<div className={classes.root}>
			<h1>Chordeographer</h1>
			<h2>Verification Page</h2>
			<h3>{message}</h3>
		</div>
	)
}

export default VerificationPage;