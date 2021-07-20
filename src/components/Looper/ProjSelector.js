import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjSelector = (props) => {

	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState({});

	useEffect(() => {

		let userID = "60ebdf0a171f280086b81f57";
		axios.get(`https://chordeo-grapher.herokuapp.com/user/${userID}/get-projects`)
		.then(function (response) {
			// console.log("api call in project selector");
			// console.log(response.data.projects);
		
			response.data.projects.sort(function(a, b) {
				var titleA = a.title.toUpperCase();
				var titleB = b.title.toUpperCase();
				if (titleA < titleB) {
					return -1;
				}
				if (titleA > titleB) {
					return 1;
				}
			
				return 0;
			});

			setProjects(response.data.projects);
		})
		.catch(function (error) {
			console.log("Error in api call in project selector.");
			console.log(error);
		})

	}, []) // dependency list

	const handleChange = (event, newValue) => {
		
		console.log("handle change in project selector");
		console.log(newValue);
		
		axios.post("https://chordeo-grapher.herokuapp.com/user/get-project",
			{
				pid: newValue.pid,
			}
		)
		.then(function (response) {
			console.log("api call to get a specific project in project selector");
			console.log(response.data);

			setProject(response.data);
			console.log("after");
			// console.log(project);
		})
		.catch(function (error) {
			console.log("error in api call in project selector to get a specific project");
			console.log(error);
		})
	};

	return (
		<Autocomplete
			freeSolo
			id="free-solo-2"
			style={{ width: 500 }}
			disableClearable
			options={projects}
			getOptionLabel={(option) => option.title}
			onChange={handleChange}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Project"
					margin="normal"
					variant="outlined"
					InputProps={{ ...params.InputProps, type: 'search' }}
				/>
			)}
		/>
	)
};

export default ProjSelector;