import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Dialog,
} from '@material-ui/core'
// import MoreVertIcon from '@material-ui/icons'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddIcon from '@material-ui/icons/Add';

import ProgLoop from './ProgLoop'

import Login_SignUp from '../Login_SignUp'
import Cookie from '../Cookie'
import axios from 'axios'



const LoopBox = () => {

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
	const [isvisible, setvisible] = useState(false);
	const toggle = () => { 
		setvisible(!isvisible); 
	};
	

	useEffect(async () => {
		// get previously used local data
		const c = localStorage.getItem('curr');
		if (c == null)
			return;

		// if valid, set previously used loops
		setcProject(JSON.parse(c));
		setProj(JSON.parse(c).loops);
		return;
			
	}, []);	

	const projToList = () =>
	{
		let a = axios.post("https://chordeo-grapher.herokuapp.com/user/get-projects", {id: inf.id})
		.then( (resp) => {
			console.log(resp.data.projects);
			setWorkspaces(resp.data.projects);
		})

		let t = workspaces;
		console.log(t);
		
		let b = [1,2].map((i) => {
		return (
		<Button>{i}</Button>
		)
		});

		return b;
	}

	const listProjs = () =>
	{
		return (
			<div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column',
				alignItems:'center', justifyContent:'center',
				backgroundColor:'red', position:'fixed', zIndex:20
				, left: 0, top: 0}}>
			<a>ayo</a>
			{projToList()}
			<p>test</p>

			<button onClick={toggle}> Click to Close</button>
			</div>
		);

	}

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
				progression: ["Am", "C", "Bb", "Fm"],
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
	
	useEffect(async () => {
		try {
			let b = await axios.post("https://chordeo-grapher.herokuapp.com/user/get-projects", {id: inf.id});
			//setWorkspaces(b);
			return;
		}
		catch (err)
		{
			console.log("err " + err);
		}

	}, [workspaces])

	return (
		<div>

			{(inf != null)?
				<Button onClick={null}>
				Get data
				</Button> : null
			}

			{ (inf != null)?
				<Button onClick={toggle}>
				Get specific project
				</Button> : null
			}
			
			{isvisible?
				listProjs():
				null
			}
			
			<Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
					{/* <Button variant="contained" color="secondary" onClick={() => console.log(currProj)}><MusicNoteIcon /> Test</Button> */}
					
				
					<Grid container direction="column" style={{width: 500}}>
						{
							currProj.map((loop, index) => {
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
