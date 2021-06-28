import React from 'react'
import {
	AppBar,
	Button,
	Toolbar,
	IconButton,
	Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';

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

	return (
		<AppBar color="transparent" position="static">
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Chordeography
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
