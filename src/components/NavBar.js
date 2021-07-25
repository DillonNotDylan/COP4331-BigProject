import React, { useState } from 'react'
import {
	AppBar,
	Button,
	Toolbar,
	IconButton,
	Typography,
	TextField,
	Link,
	Dialog,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import Login_SignUp from './Login_SignUp';
import Cookie from "./Cookie"


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const NavBar = () => {
	const classes = useStyles();
	const [lin, setLin] = useState(Cookie.getCookie("userSession") != null);
	const [passForg, setpassForg] = useState(false);
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [errMsg, setErr] = useState("");
	
	const submitLogin = () => {
		console.log("User: " + user + "pass:" + pass);

		const data =
		{
			email: user,
			password: pass,
		};

		axios.post("https://chordeo-grapher.herokuapp.com/user/signin", data)
        .then(function (response) {
            // if it has response message
				if (response.data.hasOwnProperty('message'))
				{
					setErr(response.data.message);
				}
				else
				{
					// make logged in, and use returned nickname to display
					var cInfo = {
						nickname: response.data.nickname,
						id: response.data.id,
					}
					Cookie.setJCookie("userSession",cInfo, 60);
					setLin(true);
					setErr("");
					
				}
        })
        .catch(function (error) {
            console.log(error);
        })
		
		//create cookie
	}

	const doLogOut = () => {
		console.log("loggingout");
		setUser("");
		setPass("");
		Cookie.delCookie("userSession");
		setLin(false);
	}

	const togglePassReset = () =>
	{
		setpassForg(!passForg);
	}


	const formChange = (e) => {
		// keep track??
		setErr("");
		e.persist()
		// update form values upon typing  
		if (e.target.placeholder === "Username")
			setUser(e.target.value);
		else
			setPass(e.target.value);

	}

	const sendPassReset = (e) =>
	{
		e.preventDefault();

		axios.post("https://chordeo-grapher.herokuapp.com/user/signup", {email: user})
		.then(response =>
			{
				// do stuff.
				// if successful. close out or show that email link sent?

			})
		.catch(
			err => console.log("problem sending psw reset = " + err)
		)
	}

	const passReset = () =>
	{
		return (
			<div>
			<Link onClick={()=>togglePassReset()}>Forgot Password?</Link>
			{
				passForg?
				<Dialog open={togglePassReset} onClose={togglePassReset}>
					<div style={{display:'flex', flexDirection:'column',padding:'10vh', alignItems:'center', justifyContent:'center'}}>
						<Typography style={{padding:'15px'}}>Forget Password?</Typography>
						<TextField style={{padding:'30px', width:'20vw'}} placeholder="Enter email to reset password"/>
						<button style={{padding:'5px'}} onClick={()=>setErr("")}>Reset Password via email</button>
					</div>
				</Dialog>
				:
				null
			}
			</div>
		)
	}


	const notLoggedIn = () => {

		const clickyStyle = { margin:'5px', textAlign:'center', justifyContent:'center' };
		return (
			<div style={{ maxHeight: '5vh', maxWidth: '50vw', display: 'flex', flexDirection: 'row'}}>
				<Typography style={{marginRight:'20px'}} component={'div'} >
				{
					(errMsg.length === 19)? passReset():errMsg
				}
				</Typography>
				<TextField variant="outlined" size="small" placeholder="Username" onChange={formChange} style={clickyStyle} />
				<TextField variant="outlined" size="small" placeholder="Password" onChange={formChange} style={clickyStyle} />
				
				<Login_SignUp buttonText="Sign Up" style={clickyStyle} />
				<Button color="inherit" variant="contained" onClick={submitLogin} style={clickyStyle, {paddingTop:'2%', paddingBottom:'2%'}}>Login</Button>
			</div>
		);
	}

	const isLoggedIn = () => {
		let nName = Cookie.cToJson(Cookie.getCookie("userSession"));
		if (nName == null)
			nName = "user";
		else
			nName = nName.nickname;
		return (
			<>
				<Typography variant="h6" style={{ color: 'blue', marginRight:'10vw' }} >Welcome {nName}</Typography>
				<Button onClick={doLogOut} >Log Out</Button>
			</>
		);
	}

	return (
		<AppBar color="inherit" position="static">
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Chordeography
				</Typography>
				{lin? isLoggedIn() : notLoggedIn()}

			</Toolbar>
		</AppBar>
	)
}

export default NavBar
