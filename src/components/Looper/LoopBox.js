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

} from '@material-ui/core'

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ProgLoop from './ProgLoop'
import Cookie from '../Cookie'
import Login_SignUp from '../Login_SignUp'
import ProjSelector from './ProjSelector';
import axios from 'axios'
import CustomModal from './CustomModal';
import ChordSelector from './ChordSelector';


const LoopBox = ({useMode, useKey}) => {
	let loopTemp = [];
	const inf = Cookie.cToJson(Cookie.getCookie("userSession"));
	// contains user id as 'id', and nickname as 'nickname'

	const [currProj, setProj] = useState([]);
	const [pProject, setcProject] = useState({
		pid: 0,
		title: "Unsaved Project",
		loops: [],
		dateMade: "July 1, 1990"
	});

	const [workspaces, setWorkspaces] = useState([]);
	
	useEffect(async () => {
		// get previously used local data
		const c = localStorage.getItem('curr');
		console.log(c)
		if (c == null)
			return;

		// if valid, set previously used loops
		setcProject(JSON.parse(c));
		setProj(JSON.parse(c).loops);
		return;
			
	}, []);	

	const initLoop = async (firstPID) =>
	{
		try
		{
			if (inf != null)
			{	// save data in a. wait for response to continue
				const a = await axios.post("https://chordeo-grapher.herokuapp.com/user/get-project", {pid: firstPID})
				let t = {
					pid: firstPID,
					title: a.data.title,
					loops: a.data.loops,
					dateMade: a.data.dateCreated
				};
				
				// update loops and current info
				setProj(a.data.loops);
				setcProject(t);
			}
		}
		catch (err)
		{
			console.log("warning, error" + err);
		}
	};

	const addNewLoop = () => {
		let temp = [...currProj]
		let len = temp.length
		temp.push(
			{
				progression: ["A_maj", "C_maj", "A_sharp_maj", "F_minor"],
				name: "Another Loop",
				placement: len,
			},
			{
				progression: ["A_min", "C_maj", "B_min", "F_major"],
				name: "Another Loop",
				placement: len,
			},
			{
				progression: ["D_maj", "F_min", "G_maj", "A_maj"],
				name: "Another Loop",
				placement: len,
			}
		)
		
		let t = pProject;
		t.loops = temp;
		localStorage.setItem('curr', JSON.stringify(t));
		setProj(temp)
	}

	const deleteLoop = (index) => {
		let temp = [...currProj]

		if (index === -1)
			return
			
		temp.splice(index, 1)

		// save all data to localstorage
		let t = pProject;
		t.loops = temp;
		localStorage.setItem('curr', JSON.stringify(t));
		setProj(temp)
	}

	const save = (e) =>
	{
		e.preventDefault();

		// copy over references of loops
		let t = {
			pid: pProject.pid,
			title:pProject.title,
			loops: currProj
		}

		// post change to server
		axios.patch("https://chordeo-grapher.herokuapp.com/user/update-project", t)
		.catch(function (err) {console.log(err)} )
	}

	
	const getProjectById = () => {
		let userID = "60ebdf0a171f280086b81f57"

		const res = axios.post("https://chordeo-grapher.herokuapp.com/get-project",
			{
				pid: "60ebdfaa171f280086b81f5f"

				
			}
		)
	}
	
	const loadProj = () =>
	{
		// get object from storage
		let t = JSON.parse(localStorage.getItem('curr'));
		
		console.log(localStorage.getItem('newPID'));
		initLoop(localStorage.getItem('newPID'));
	}

	return (
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
				<ProjSelector setProj={setProj}/>
				: null
			}

			<Card >
				<CardContent>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe">
								A
							</Avatar>
						}
						// action={
						// 	<IconButton aria-label="settings">
						// 		<MoreVertIcon />
						// 	</IconButton>
						// }
						title={pProject.title}
						subheader={"Created on " + pProject.dateMade}
					/>

					<Button variant="contained" color="secondary" onClick={addNewLoop}><MusicNoteIcon /> New Loop</Button>
					{
						inf != null?
						<Button variant="contained" color="secondary" onClick={save} style={{float:'right'}}> Save Data</Button>
						: null
					}
					
					<CustomModal body={<ChordSelector progression={null}/>} />
				
					<Grid container direction="column" style={{width: 500}}>
						{
							// Th
							// 0 1 2 3 4 etc
							pProject.loops.map((loop, index) => {
								return (
									<Grid item style={{justifyContent: 'center'}}>
										<ProgLoop loopData={loop} id={index} deleteLoop={deleteLoop}/>
									</Grid>
								)
							})
						}
					</Grid>
					
					{/* <ProgLoop /> */}
					{	// show sign up button if cookie deems not logged in
						inf == null?
						<Login_SignUp style={{paddingTop:'25px', textAlign: 'center'}} buttonText="Save Progression and Sign Up"/>
						:null
					}
					
				</CardContent>
			</Card>

		</div>
	)
}

export default LoopBox
