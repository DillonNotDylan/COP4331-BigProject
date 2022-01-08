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
	Paper,
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

	const deleteLoop = (index) => {
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

	const updateLoop = (indexToUpdate, updatedProg, loopName, loopMode, loopKey) => {
		let temp = {...pProject}
		console.log(temp.loops)
		let toInsert = {
			key: loopKey,
			mode: loopMode,
			name: loopName,
			progression: updatedProg,
		}
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

		<div style={{ position: "relative", width: "100%"}}>
			<div>
				{/* <ReactPiano /> */}
			</div>
			
			<Card style={{ borderRadius: '20px', backgroundColor: '#ebddd1', boxShadow: '10px 10px 20px #c8bcb2, -15px -15px 60px #fffef0'}}>
				<CardContent style={{display: 'flex'}}>
					<div style={{margin: '3%', width: '25%'}}>
						<div>
							{
								(inf != null) ?
									<div>
										<ProjSelector loadProj={loadProj} />
									</div>
								: null
							}
						</div >

						<CardHeader style={{ borderRadius: '20px', backgroundColor: '#fefefe', boxShadow: '5px 5px 60px #c8bcb2, -5px -5px 20px #fffef0'}}
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

						{
							inf != null ?
								<div>
									<ButtonGroup>
										<Confirm title={"Save Data"} diagText={"Update this project?"} thenFunc={save}/>
										<Confirm title={"Submit Project"} diagText={"Are you sure you wish to add this as a separate project?"} thenFunc={submitProject}/>
										<Confirm title={"Delete Project"} diagText={"Are you sure you wish to delete?"} thenFunc={deleteProject}/>
									</ButtonGroup>
								</div>
							: null
						}

						<ToolPage grabKey={grabKey} grabMode={grabMode} />
					</div>

					<div style={{margin: '3%', width: '65%', borderRadius: '20px', backgroundColor: '#f3ebe5', boxShadow: 'inset 10px 10px 10px #c8bcb2, inset 0px 0px 10px #fffef0', paddingBottom: '1rem', height: '65vh'}}>
						<Grid container direction="column" style={{ width: "90%", marginLeft:"5%", marginTop: '5%'}}>
							<Paper style={{ maxHeight: 350, overflow: 'auto' }}>
							{
								pProject.loops.map((loop, index) => {
									return (
										<div>
											<Grid ite>
												<ProgLoop 
													deleteLoop={deleteLoop} 
													id={index} 
													loopData={loop} 
													updateLoop={updateLoop}
													useKey={useKey}
													useMode={useMode}
												/>
											</Grid>
										</div>
									)
								})
							}
							</Paper>
						</Grid>

						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem'}}>
							<CustomModal
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
						</div>
						
						{/* <ProgLoop /> */}
						{	
							// show sign up button if cookie deems not logged in
							inf == null ?
								<div>
									<Login_SignUp style={{paddingTop:'25px', textAlign: 'center'}} buttonText="Save Progression and Sign Up"/>
								</div>
							: null
						}
					</div>
					
				</CardContent>
			</Card>

		</div>
	)
}

export default LoopBox
