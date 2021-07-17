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
//import cookie from "react-cookie";


let signInLoginRoute = "http://localhost:5000/user/signin";
let registerLoginRoute = "http://localhost:5000/user/signup";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'center',

	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		// flexGrow: 1,
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
			<section className={classes.notLogged}>
				<Grid
					container
					direction="row"
					alignItems="center"
					spacing={1}
				>
					<Grid item md={6}>
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

					<Grid item md={2}>
						<Button 
							color="default" 
							variant="contained" 
							onClick={submitLogin} 
						>Login</Button>

					</Grid>

					<Grid item md>
						<Login_SignUp  buttonText="Sign Up"/>
					</Grid>
				
				</Grid>

			</section>
		);
	}

	const isLoggedIn = () => {
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

				{lin ? isLoggedIn() : notLoggedIn()}

			</Toolbar>
		</AppBar>
	)
}

export default NavBar
