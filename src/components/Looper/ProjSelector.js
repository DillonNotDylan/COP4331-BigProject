import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
	InputLabel,
	MenuItem,
	FormHelperText,
	FormControl,
	Select
} from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const ProjSelector = () => {
	
	const classes = useStyles();
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	
	const getProjects = () => {
		let userID = "60ebdf0a171f280086b81f57";
		const res = axios.get(`https://chordeo-grapher.herokuapp.com/${userID}/get-projects`)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">Project</InputLabel>
				<Select
					labelId="project-select-outlined-label"
					id="project-select"
					value={age}
					onChange={handleChange}
					label="Project"
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
};

export default ProjSelector;