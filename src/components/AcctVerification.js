import React, {useState} from 'react';
import axios from 'axios';
import { Typography, Dialog, Button } from '@material-ui/core';

const AcctVerification = () =>
{
	// get string after URl in form "google.com?vid=1000"
	// grabs only ?vid=1000...
	var a = new URLSearchParams(window.location.search);
	const [disptext, setText] = useState("Account Verified!");

	const submitAndLogin = (e) =>
	{
		e.preventDefault();

		axios.post("https://chordeo-grapher.herokuapp.com/user/signup", {vId: a.get("vid")})
		.then(response =>
			{
				setText("redirecting to site")
			// if succesfull, create cookie. 
			//then show and hide
			})
		.catch(
			err => console.log("Error verifying:" + err)
		)
	}

	const hide = () =>
	{
		// hide dialog and login
		// then redirect back to site
		window.location = window.location.origin;
	}

	if (a.has("vid"))
	{
		return (
			<div>
			<h1>test</h1>
			<Dialog fullscreen open={()=>null} onClose={hide}>
				<div style={{display:'flex', flexDirection:'column',padding:'10vh', alignItems:'center', justifyContent:'center'}}>
					<Typography>{disptext}</Typography>
					<Button onClick={submitAndLogin} >Back To Site</Button>
				</div>
			</Dialog>
			</div>
		);
	}

	else
		return null;

}

export default AcctVerification;