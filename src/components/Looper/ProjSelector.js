import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from '../Cookie'

const ProjSelector = ({loadProj}) => {

	const [projects, setProjects] = useState([]);

	//get User cookie info
	const inf = Cookie.cToJson(Cookie.getCookie("userSession"));

	useEffect(() => {


		let userID = inf.id;
		axios.post(`https://chordeo-grapher.herokuapp.com/user/get-projects`,
		{
			id: userID
		})
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
		localStorage.setItem('newPID', newValue.pid);
		
		axios.post("https://chordeo-grapher.herokuapp.com/user/get-project",
			{
				pid: newValue.pid,
			}
		)
		.then(function (response) {
			console.log("api call to get a specific project in project selector");
			console.log(response.data);

			loadProj()
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