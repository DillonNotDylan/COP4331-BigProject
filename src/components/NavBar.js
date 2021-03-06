import React, { useState } from 'react'
import {
	AppBar,
	Button,
	ButtonGroup,
	Toolbar,
	IconButton,
	Typography, Box,
	TextField,
	ThemeProvider,
	createMuiTheme
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import axios from 'axios';
import { RestoreOutlined } from '@material-ui/icons';
import Login_SignUp from './Login_SignUp';
import Cookie from "./Cookie"
import ForgotPassword from './ForgotPassword'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		borderRadius: 5,
		padding: 10
		// height: 100
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},

	text: {
		color: 'white'
	}
}));

const barTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#dddddd'
		},

		secondary: {
			main: '#673ab7',
			contrastText: '#000'

		}

	}

});

const typeTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fafafa'
		}
	}
})


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

	const toggleForgotPop = () => {
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

		const clickyStyle = { textAlign: 'center', justifyContent: 'center', margin: '10', height: '45', color: 'black'};
		return (
			<div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: '-1.25rem' }}>
				{	// show forgot password dialog on click
					forgPass ?
						<ForgotPassword toggle={toggleForgotPop}/>
						: null
				}
				<Typography style={{ marginRight: 125, height: 35 }} >{errMsg}</Typography>

				<TextField variant="outlined" size="small" placeholder="Username" onChange={formChange} style={clickyStyle} InputProps={{ className: classes.text }} />


				<ButtonGroup orientation="vertical">
					<TextField variant="outlined" size="small" placeholder="Password" type="password" onChange={formChange} style={clickyStyle} InputProps={{ className: classes.text }} />
				</ButtonGroup>

				<ButtonGroup style={{ textAlign: 'center', justifyContent: 'center', margin: 10, marginRight: 10 }}>
					<Button variant="contained" onClick={submitLogin} style={{ height: 50, marginRight: 10, borderRadius: 5, backgroundColor: '#f3ebe5' }}>
						Login
					</Button>
					<Login_SignUp buttonText="Sign Up" />
					<ThemeProvider theme={typeTheme}>
						<Button variant="text" onClick={toggleForgotPop} style={{ marginLeft: 15, padding: 1, color: 'black', marginTop: '0.25rem' }} color='primary'>
							Forgot Password?
						</Button>
					</ThemeProvider>
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
				<Typography variant="h6" style={{ color: 'white', marginRight: '10vw' }} >Welcome {nName}</Typography>
				<Button onClick={doLogOut} variant="contained">Log Out</Button>
			</>
		);
	}

	return (
		<ThemeProvider theme={barTheme}>
			<AppBar position="static" className={classes.root} style={{marginBottom: "1%", backgroundColor: '#cdab8f', height: '4rem'}}>
				<Toolbar>
					<ThemeProvider theme={barTheme}>
						<IconButton edge="start" className={classes.menuButton} aria-label="menu" color="black" style={{marginTop: '-1rem'}} >
							<LibraryMusicIcon fontSize="large" />
						</IconButton>
					</ThemeProvider>
					<ThemeProvider theme={typeTheme}>
						<Typography variant="h6" className={classes.title} color="primary" style={{color: 'black', marginTop: '-1rem'}}>
							Chordeographer
						</Typography>
					</ThemeProvider>

					{lin ? isLoggedIn() : notLoggedIn()}

				</Toolbar>
			</AppBar>
		</ThemeProvider>

	)
}

export default NavBar