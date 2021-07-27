import React, { useState } from 'react'
import {
	AppBar,
	Button,
	Toolbar,
	IconButton,
	Typography,
	TextField,
	Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { RestoreOutlined } from '@material-ui/icons';
import Login_SignUp from './Login_SignUp';
import Cookie from "./Cookie"

let signInLoginRoute = "https://chordeo-grapher.herokuapp.com/user/signin";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'center',
		borderRadius: 5
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		// marginRight: 100,
		// display: 'flex'
	},
	notLogged: {
		flexDirection:'row',
		justifyContent:'flex-end',
		
		display: 'flex' 
	},
	logged: {
		marginLeft: '75%'
	}
}));

const NavBar = () => {
	const classes = useStyles();
	const [lin, setLin] = useState(Cookie.getCookie("userSession") != null);
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

		var b =axios.post("https://chordeo-grapher.herokuapp.com/user/signin", data)
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
		return (
			<section className={classes.notLogged}>
				<Grid
					container
					direction="row"
					alignItems="center"
					spacing={1}
					style={
						{display: "flex",
						 flexWrap: "noWrap",
						 minWidth: 150
						}
					}
				>
					<Grid item>
						<TextField
							variant="outlined"
							size="small"
							placeholder="Username"
							onChange={formChange} 
						/>

						<TextField
							variant="outlined"
							size="small"
							placeholder="Password"
							onChange={formChange}
						/>	
					</Grid>

					<Grid item>
						<Button 
							color="default" 
							variant="contained" 
							onClick={submitLogin} 
						>Login</Button>

					</Grid>

					<Grid item>
						<Login_SignUp  buttonText="Sign Up"/>
					</Grid>
				
				</Grid>

			</section>
		);
	}

	const isLoggedIn = () => {
		let nName = Cookie.cToJson(Cookie.getCookie("userSession"));
		if (nName == null)
			nName = "user";
		else
			nName = nName.nickname;
		return (
			<section className={classes.logged}>
				<Grid container spacing={10}>
					<Grid item xs={6}>
						<Typography variant="h6" style={{ color: 'yellow' }} >Welcome {user}</Typography>
					</Grid>

					<Grid item xs={6}>
						<Button onClick={doLogOut} >Log Out</Button>
					</Grid>
				</Grid>
			</ section>
		);
	}

	return (

		<AppBar color="secondary" position="static" className={classes.root}>
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
