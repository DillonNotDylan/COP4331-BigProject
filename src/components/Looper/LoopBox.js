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
import ToolPage from '../Tools/ToolPage';
import Confirm from '../Tools/Confirm';


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
		dateMade: new Date().toString()
	});

	const [useKey, grabKey] = React.useState("C");
	const [useMode, grabMode] = React.useState(2);

	// const [pendingChange, setPending] = useState(false)

	useEffect(() => {
		console.log(pProject)
		// setPending(true)
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


	const deleteLoop = (index) => {
		// let temp = [...pProject.loops]
		let temp = {...pProject}

		if (index === -1)
			return
			
		temp.loops.splice(index, 1)

		// save all data to localstorage

		setcProject(temp)
	}

	const save = () =>
	{

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
			// pid: pProject.pid,
			title: pProject.title,
			loops: pProject.loops,
			key: pProject.key,
			mode: pProject.mode
		}

		// post change to server
		axios.post("https://chordeo-grapher.herokuapp.com/user/new-project", t)
			.then(response => window.location=window.location)
			.catch(function (err) { console.log(err) })
	}

	const makeBlank = () => {
		let t = {
			id: inf.id,
			pid: pProject.pid,
			title: pProject.title,
			loops: pProject.loops,
			key: pProject.key,
			mode: pProject.mode
		}
	}


	// To update a loop, we need: its place in the overall project's loop array to replace the
	// old version, 
	// 
	const updateLoop = (indexToUpdate, updatedProg, loopName, loopMode, loopKey) => {
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

	const addLoop = (updatedProg, loopName, loopMode, loopKey) => {
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

	const deleteProject = () => {
		let t = {
			id: inf.id,
			pid: pProject.pid,
		}

		if (t.id == 0)
			return;

		let clear = {
			pid: 0,
			title: "Unsaved Project",
			loops: [],
			key: "C",
			mode: 2,
			dateMade: "July 29, 2021"
		}

		setcProject(clear)
		// post change to server
		axios.post("https://chordeo-grapher.herokuapp.com/user/delete-project", t)
			.then(response => window.location = window.location)
			.catch(function (err) { console.log(err) })
	}
	
	const loadProj = () =>
	{
		// get object from storage
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

		<div style={{ position: "relative", width: "80%", left: "9.5vw" }}>

			<div>
				{/* <ReactPiano /> */}
			</div>
			
			
			<Card>
				<CardContent>
					<div>

						{
							(inf != null) ?
								<div>
									<ProjSelector loadProj={loadProj} />
								</div>

								: null
						}
					</div >
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
					{/* {pendingChange && "You have pending changes not saved. Navigating to another project will delete these changes"} */}

					{/* <Button variant="contained" color="secondary" onClick={addNewLoop}><MusicNoteIcon /> New Loop</Button> */}
					{
						inf != null
						?
							<div>
								<ButtonGroup>
									{/* <Button 
										variant="contained" 
										color="primary" onClick={save} 
										style={{float:'right'}}
									> 
										Save Data
									</Button> */}
									<Confirm title={"Save Data"} diagText={"Update this project?"} thenFunc={save}/>
									{/* <Button onClick={submitProject}>Submit Project</Button> */}
									<Confirm title={"Submit Project"} diagText={"Are you sure you wish to add this as a separate project?"} thenFunc={submitProject}/>
									<Confirm title={"Delete Project"} diagText={"Are you sure you wish to delete?"} thenFunc={deleteProject}/>
									{/* <Button onClick={deleteProject}>Delete Project</Button> */}
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
				
					<Grid container direction="column" style={{ width: 500, justifyContent: "center"}}>
						<Card>

						
						{
							// Th
							// 0 1 2 3 4 etc
							pProject.loops.map((loop, index) => {
								return (
									<Grid item>
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
						</Card>
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
