import React, { useState } from 'react'
import {
	AppBar,
	Button,
	Toolbar,
	IconButton,
	Typography,
	TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { RestoreOutlined } from '@material-ui/icons';
import Login_SignUp from './Login_SignUp';
//import cookie from "react-cookie";


let signInLoginRoute = "https://chordeographer.herokuapp.com/user/signin";
let registerLoginRoute = "https://chordeographer.herokuapp.com/user/signup";

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
	const [lin, setLin] = useState(false);
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [respData, setResp] = useState(null);

	const submitLogin = () => {
		console.log("User: " + user + "pass:" + pass);

		const data =
		{
			email: user,
			password: pass,
		};

		axios.post(signInLoginRoute, data)
			.then(response => {
				if (response.data.message.length > 0) {
					console.log(response.data.message);
					alert(response.data.message);
				}
				else
					console.log(response.data);
			}
			)
			.catch(err => {
				console.log("An Error Occurred");
			}
			);

		//create cookie


		setLin(true);
	}

	const doLogOut = () => {
		console.log("loggingout");
		setLin(false);
	}

	const doRegister = () => {
		const tempUser =
		{
			email: "angel0615@knights.ucf.edu",
			password: "leedle",
		}

		axios.post(registerLoginRoute, tempUser)
			.then(response => {
				console.log(response.data);
			}
			)
			.catch(err => console.log("somethings wrong mate"))


	}

	const formChange = (e) => {
		// keep track??
		e.persist()
		// update form values upon typing  
		if (e.target.placeholder == "Username")
			setUser(e.target.value);
		else
			setPass(e.target.value);

	}

	const notLoggedIn = () => {
		return (
			<div style={{ maxHeight: '5vh', maxWidth: '30vw', diplay: 'absolute', right: '2vw' }}>

				<TextField variant="outlined" size="small" placeholder="Username" onChange={formChange} style={{ borderColor: "yellow" }} />
				<TextField variant="outlined" size="small" placeholder="Password" onChange={formChange} color="white" />
				<Login_SignUp buttonText="Sign Up" style={{ margin: '0px', padding: '0px' }} />

				<Button color="inherit" variant="contained" onClick={submitLogin} >Login</Button>

			</div>
		);
	}

	const isLoggedIn = () => {
		return (
			<>
				<Typography variant="h6" style={{ color: 'yellow' }} >Welcome {user}</Typography>
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

				{lin ? isLoggedIn() : notLoggedIn()}

			</Toolbar>
		</AppBar>
	)
}

export default NavBar
