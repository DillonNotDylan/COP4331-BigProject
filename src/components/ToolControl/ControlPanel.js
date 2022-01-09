import React, { useState, useEffect } from 'react';
import {
	Avatar,
	ButtonGroup,
	CardHeader,
	TextField
} from '@material-ui/core'

import axios from 'axios'
import Cookie from '../Login/Cookie'
import ProgLoop from '../Looper/ProgLoop'
import Confirm from '../Tools/Confirm';
import CustomModal from '../Looper/CustomModal';
import ToolPage from '../Tools/ToolPage';
import ProjSelector from '../Looper/ProjSelector';
import Login_SignUp from '../Login/Login_SignUp';
import { AddOutlined } from '@material-ui/icons';

export default function ControlPanel() {
	const inf = Cookie.cToJson(Cookie.getCookie("userSession"));
	
	const [useKey, grabKey] = React.useState("C");
	const [useMode, grabMode] = React.useState(2);

	// Actual project info
	const [pProject, setcProject] = useState(JSON.parse(localStorage.getItem('curr')) || {
		pid: 0,
		title: "Unsaved Project",
		loops: [],
		key: "C",
		mode: 2,
		dateMade: new Date().toString()
	});

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

	const deleteLoop = (index) => {
		let temp = {...pProject}

		if (index === -1)
			return
			
		temp.loops.splice(index, 1)

		// save all data to localstorage
		setcProject(temp)
	}

	const loadProject = () =>
	{
		// get object from storage
		console.log(localStorage.getItem('newPID'));
		initLoop(localStorage.getItem('newPID'));
	}

	const saveProject = () =>
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

	const handleProjName = (e) => {
		let temp = {...pProject}
		temp.title = e.target.value
		setcProject(temp)
	}

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'Row',
            borderRadius: '20px',
            padding: '2rem',
            marginTop: '2rem', 
            width: '90%',
            height: '75vh',
            borderRadius: '20px', 
            backgroundColor: '#ebddd1', 
            boxShadow: '5px 5px 10px #c8bcb2, -2px -2px 15px #fffef0'}}>

            <div style={{ 
            padding: '2rem',
            margin: '1rem', 
            width: '30%',
            height: '65vh',
            borderRadius: '15px', 
            background: '#f3ebe5', 
            boxShadow: 'inset 10px 10px 10px #c8bcb2, inset 0px 0px 10px #fffef0'}}>
                <div>
                    {
                        (inf != null) ?
                            <div>
                                <ProjSelector loadProj={loadProject} />
                            </div>
                        : null
                    }
                </div >

                <CardHeader style={{ borderRadius: '20px', backgroundColor: '#fefefe', boxShadow: '2px 2px 8px #c8bcb2, -2px -2px 8px #fffef0'}}
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
                                <Confirm title={"Save Data"} diagText={"Update this project?"} thenFunc={saveProject}/>
                                <Confirm title={"Submit Project"} diagText={"Are you sure you wish to add this as a separate project?"} thenFunc={submitProject}/>
                                <Confirm title={"Delete Project"} diagText={"Are you sure you wish to delete?"} thenFunc={deleteProject}/>
                            </ButtonGroup>
                        </div>
                    : null
                }

                <ToolPage grabKey={grabKey} grabMode={grabMode} />
            </div>

            <div style={{
            borderRadius: '20px', 
            padding: '2rem',
            margin: '1rem', 
            width: '60%',
            height: '65vh',
            borderRadius: '15px', 
            background: '#f3ebe5', 
            boxShadow: 'inset 10px 10px 10px #c8bcb2, inset 0px 0px 10px #fffef0'}}>

                <div style={{ width: "100%", marginTop: '5%', height: '15rem'}}>
                    <div style={{padding: '2rem', background: 'red', borderRadius: '15px', backgroundColor: '#ebddd1', boxShadow: '8px 8px 15px #c8bcb2, -10px -10px 30px #fffef0'}}>
                        <div style={{ maxHeight: 450, overflow: 'auto', background: '#ebddd1'}}>
                        {
                            pProject.loops.map((loop, index) => {
                                return (
                                    <div style={{marginBottom: '1.5rem'}}>
                                            <ProgLoop 
                                                deleteLoop={deleteLoop} 
                                                id={index} 
                                                loopData={loop} 
                                                updateLoop={updateLoop}
                                                useKey={useKey}
                                                useMode={useMode}
                                        />
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '20%', position: 'sticky'}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '6.25rem', bottom: 0}}>
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
                    
                    {	
                        // show sign up button if cookie deems not logged in
                        inf == null ?
                            <div>
                                <Login_SignUp style={{paddingTop:'25px', textAlign: 'center', marginTop: '4.5rem', marginLeft: '2rem'}} buttonText="Save Progression and Sign Up"/>
                            </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
 
