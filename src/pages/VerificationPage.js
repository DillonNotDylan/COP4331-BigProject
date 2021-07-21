import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';

const VerificationPage = () => {
	
	const { token } = useParams();
	const [message, setMessage] = useState("");

	useEffect(() => {

		axios.get(`https://chordeo-grapher.herokuapp.com/user/verify-account/${token}`)
		.then(function (response) {
			console.log("api call in project selector");
			console.log(response.data);
			setMessage(response.data.message);
		})
		.catch(function (error) {
			console.log("error in api call in account verification page");
			console.log(error);
		})

	}, [])

	return (
		<div>
			<h1>Verification Page</h1>
			<h1>{token}</h1>
			<h1>{message}</h1>
		</div>
	)
}

export default VerificationPage;