import React, { useState } from 'react'
import {
	AppBar,
	Button,
	ButtonGroup,
	Toolbar,
	IconButton,
	Typography, Box, 
	TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { RestoreOutlined } from '@material-ui/icons';
import Login_SignUp from './Login_SignUp';
import Cookie from "./Cookie"
import ForgotPassword from './ForgotPassword'

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
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [errMsg, setErr] = useState("");
	const [forgPass, setForgPass] = useState(false);

	const submitLogin = () => {
		console.log("User: " + user + ", pass:" + pass);

		const data =
		{
			email: user,
			password: pass,
		};

		var b = axios.post("https://chordeo-grapher.herokuapp.com/user/signin", data)
			.then(function (response) {
				// if it has response message
				if (response.data.hasOwnProperty('message')) {
					setErr(response.data.message);
				}
				else {
					// make logged in, and use returned nickname to display
					var cInfo = {
						nickname: response.data.nickname,
						id: response.data.id,
					}
					Cookie.setJCookie("userSession", cInfo, 60);
					setLin(true);
					setErr("");
					window.location = window.location;
				}
			})
			.catch(function (error) {
				console.log(error);
			})

		//create cookie
	}

	const doLogOut = () => {
		console.log("loggingout");
		localStorage.clear();
		setPass("");
		Cookie.delCookie("userSession");
		setLin(false);
		// refresh window to reload components
		window.location = window.location;
	}

	const toggleForgotPop = () =>
	{
		setForgPass(!forgPass);
	}

	const formChange = (e) => {
		// keep track??
		setErr("");
		e.persist()
		// update form values upon typing  
		if (e.target.placeholder == "Username")
			setUser(e.target.value);
		else
			setPass(e.target.value);
	}


	const notLoggedIn = () => {

		const clickyStyle = { margin: '4px', textAlign: 'center', justifyContent: 'center' };
		return (
			<div style={{ maxHeight: '5vh', maxWidth: '50vw', display: 'flex', flexDirection: 'row' , padding:'5vh'}}>
				{	// show forgot password dialog on click
					forgPass?
					<ForgotPassword toggle={toggleForgotPop}/>
					: null
				}
				<Typography style={{ marginRight: '20px' }} >{errMsg}</Typography>
				<div>
					<TextField variant="outlined" size="small" placeholder="Username" onChange={formChange} style={clickyStyle} />
					<TextField variant="outlined" size="small" placeholder="Password" type="password" onChange={formChange} style={clickyStyle} />


				</div>

				<ButtonGroup style={{display:'flex', flexDirection:'column', maxHeight:'100%', justifyContent:'center'}} >
					<ButtonGroup style={{display:'flex', flexDirection:'row', paddingTop:'17%'}}>
						<Button color="inherit" variant="contained" onClick={submitLogin} style={{textAlign:'center', justifyContent: 'center', marginLeft: '1vw', marginRight:'1vw' }}>Login</Button>
						<Login_SignUp buttonText="Sign Up" style={{textAlign: 'center', justifyContent: 'center'}} />
					</ButtonGroup>
					<Button variant="text" color="primary" onClick={toggleForgotPop}>
						Forgot Password
					</Button>
				</ButtonGroup>

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
				<Typography variant="h6" style={{ color: 'black', marginRight: '5vw' }} >Welcome, {nName}</Typography>
				<Button onClick={doLogOut} >Log Out</Button>
			</>
		);
	}

	return (
		<AppBar color="primary" position="static">
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Chordeographer
				</Typography>
				{lin ? isLoggedIn() : notLoggedIn()}

			</Toolbar>
		</AppBar>
	)
}

export default NavBar