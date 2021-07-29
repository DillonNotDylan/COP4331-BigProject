import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	AppBar,
	Toolbar,
	TextField
} from '@material-ui/core'

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { AddOutlined, ModeComment, Title } from '@material-ui/icons';
import ProgLoop from './ProgLoop'
import Cookie from '../Cookie'
import Login_SignUp from '../Login_SignUp'
import ProjSelector from './ProjSelector';
import axios from 'axios'
import CustomModal from './CustomModal';
import ChordSelector from './ChordSelector';
import ToolPage from '../Tools/ToolPage';


const LoopBox = () => {

	const inf = Cookie.cToJson(Cookie.getCookie("userSession"));
	// contains user id as 'id', and nickname as 'nickname'

	// const [currProj, setProj] = useState([]);

	// Actual project info
	const [pProject, setcProject] = useState(JSON.parse(localStorage.getItem('curr')) || {
		pid: 0,
		title: "Unsaved Project",
		loops: [],
		key: "C",
		mode: 2,
		dateMade: "July 1, 1990"
	});

	const test = {
		title: "",
		progression: ["C_maj", "C_maj", "C_maj", "C_maj"],
		mode: "1"
	}

	const [useKey, grabKey] = React.useState("C");
	// const [useQuality, grabQuality] = React.useState();
	const [useMode, grabMode] = React.useState(2);

	useEffect(() => {
		console.log(pProject)
		localStorage.setItem('curr', JSON.stringify(pProject))
	}, [pProject])

	const initLoop = async (firstPID) =>
	{
		try
		{
			// 0 indicates new project, init to empty with todays date
			if (firstPID === "0")
			{	// since ID is a string, we use this format
				let t = {
					pid: 0,
					title: "Unsaved Project",
					loops: [],
					dateMade: new Date()
				};

				setcProject(t);
				return;
			}
			
			if (inf != null && firstPID != 0)
			{	// save data in a. wait for response to continue
				const a = await axios.post("https://chordeo-grapher.herokuapp.com/user/get-project", {pid: firstPID})
				let t = {
					pid: firstPID,
					title: a.data.title,
					loops: a.data.loops,
					dateMade: a.data.dateCreated
				};
				
				// update loops and current info
				setcProject(t);
			}
		}
		catch (err)
		{
			console.log("warning, error" + err);
		}
	};

	// const addNewLoop = () => {
	// 	let temp = [...pProject.loops]
	// 	let len = temp.length
	// 	temp.push(
	// 		{
	// 			progression: ["A_maj", "C_maj", "A_sharp_maj", "F_minor"],
	// 			name: "1",
	// 			placement: len,
	// 		},
	// 		{
	// 			progression: ["A_min", "C_maj", "B_min", "F_major"],
	// 			name: "2",
	// 			placement: len,
	// 		},
	// 		{
	// 			progression: ["D_maj", "F_min", "G_maj", "A_maj"],
	// 			name: "3",
	// 			placement: len,
	// 		}
	// 	)
	// 	let t = {...pProject};
	// 	t.loops = temp;
	// 	console.log(t)
	// 	// localStorage.setItem('curr', JSON.stringify(t));
	// 	console.log(localStorage.getItem('curr'))
	// 	setcProject(t);
		
	// }

	const deleteLoop = (index) => {
		// let temp = [...pProject.loops]
		let temp = {...pProject}

		if (index === -1)
			return
			
		temp.loops.splice(index, 1)

		// save all data to localstorage

		setcProject(temp)
	}

	const save = (e) =>
	{
		e.preventDefault();

		// copy over references of loops
		let t = {
			pid: pProject.pid,
			title:pProject.title,
			loops: pProject.loops,
			key: pProject.key,
			mode: pProject.mode
		}

		// check if current project exists
		if (t.pid == 0)
		{	// instead 
			console.log("different");
			return;
		}


		// post change to server
		axios.patch("https://chordeo-grapher.herokuapp.com/user/update-project", t)
		.catch(function (err) {console.log(err)} )
	}

	const submitProject = () => {
		let t = {
			id: inf.id,
			pid: pProject.pid,
			title: pProject.title,
			loops: pProject.loops,
			key: pProject.key,
			mode: pProject.mode
		}

		// post change to server
		axios.post("https://chordeo-grapher.herokuapp.com/user/new-project", t)
			.catch(function (err) { console.log(err) })
	}

	// To update a loop, we need: its place in the overall project's loop array to replace the
	// old version, 
	// 
	const updateLoop = (indexToUpdate, updatedProg, loopName, loopKey, loopMode) => {
		let temp = {...pProject}
		console.log(temp.loops)
		let toInsert = {
			key: loopKey,
			mode: loopMode,
			name: loopName,
			progression: updatedProg,
		}
		// temp.loops[indexToUpdate].progression = updatedProg
		// temp.loops[indexToUpdate].title = title;
		temp.loops[indexToUpdate] = toInsert
		setcProject(temp)
	}

	const addLoop = (updatedProg, loopName, loopKey, loopMode) => {
		let temp = { ...pProject }
		console.log(temp.loops)
		let toInsert = {
			key: loopKey,
			mode: loopMode,
			name: loopName,
			progression: updatedProg,
		}
		temp.loops.push(toInsert)
		setcProject(temp)
	}

	
	// const getProjectById = () => {
	// 	let userID = "60ebdf0a171f280086b81f57"

	// 	const res = axios.post("https://chordeo-grapher.herokuapp.com/get-project",
	// 		{
	// 			pid: "60ebdfaa171f280086b81f5f"

				
	// 		}
	// 	)
	// }
	
	const loadProj = () =>
	{
		// get object from storage
		// let t = JSON.parse(localStorage.getItem('curr'));
		
		console.log(localStorage.getItem('newPID'));
		initLoop(localStorage.getItem('newPID'));
	}

	const handleProjName = (e) => {
		// e.persist();
		let temp = {...pProject}
		temp.title = e.target.value
		setcProject(temp)
		// console.log(projName);
	}

	return (
		<div>

			<div>

				{(inf != null)?
					<Button onClick={loadProj}>
					Get data
					</Button> : null
				}

				{ (inf != null)?
					<Button onClick={null}>
					Get specific project
					</Button> : null
				}

				<Button
					onClick={() => 
						{
							console.log(useMode)
							console.log(useKey)
						}
					}
				>
					Test Key and Mode
				</Button>
				{
					(inf != null)?
						<div>
							<ProjSelector loadProj={loadProj}/>
						</div>

					: null
				}
		</div>
			
			<Card>
				<CardContent>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe">
								A
							</Avatar>
						}

						title={
							<TextField 
								placeholder="Project Name"
								value={pProject.title}
								onChange={handleProjName}
							/>
						}
						subheader={"Created on " + pProject.dateMade}
					/>

					{/* <Button variant="contained" color="secondary" onClick={addNewLoop}><MusicNoteIcon /> New Loop</Button> */}
					{
						inf != null
						?
							<div>
								<ButtonGroup>
									<Button 
										variant="contained" 
										color="secondary" onClick={save} 
										style={{float:'right'}}
									> 
										Save Data
									</Button>
									<Button onClick={submitProject}>Submit Project</Button>
								</ButtonGroup>
							</div>

						: null
					}
					<ToolPage grabKey={grabKey} grabMode={grabMode} />
					

					 {/* Use the modal that opens up the edit form, but we will
					 pass it props that let it know we are making a new loop from
					 scratch, rather than editing one. This will allow it to prepopulate with
					 default data */}
					<CustomModal
						// This id in this instance doesn't do anything, I'm just giving it -1 to say we don't use it
						// as a prop when we're simply adding a new loop 
						id={-1}
						loopData={{
							title: "",
							progression: (useMode === 5 ? [useKey + "_min", useKey + "_min", useKey + "_min", useKey + "_min"] : [useKey + "_maj", useKey + "_maj", useKey + "_maj", useKey + "_maj"]),
							key: useKey,
							mode: useMode
						}}
						submitAction={addLoop}
						addFlag={true}
						icon={<AddOutlined />}
					/>



					{/* <CustomModal body={<ChordSelector progression={null}/>} /> */}
				
					<Grid container direction="column" style={{width: 500}}>
						{
							// Th
							// 0 1 2 3 4 etc
							pProject.loops.map((loop, index) => {
								return (
									<Grid item style={{justifyContent: 'center'}}>
										<ProgLoop 
											deleteLoop={deleteLoop} 
											id={index} 
											loopData={loop} 
											updateLoop={updateLoop}
											useKey={useKey}
											useMode={useMode}
										/>
									</Grid>
								)
							})
						}
					</Grid>
					
					{/* <ProgLoop /> */}
					{	// show sign up button if cookie deems not logged in
						inf == null
						?
							<div>
								<Login_SignUp style={{paddingTop:'25px', textAlign: 'center'}} buttonText="Save Progression and Sign Up"/>
							</div>

						:null
					}
					
				</CardContent>
			</Card>

		</div>
	)
}

export default LoopBox
