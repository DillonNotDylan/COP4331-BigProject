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
// import MoreVertIcon from '@material-ui/icons'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddIcon from '@material-ui/icons/Add';

import ProgLoop from './ProgLoop'

import Login_SignUp from '../Login_SignUp'

import axios from 'axios'
import CustomModal from './CustomModal';
import ChordSelector from './ChordSelector';

const loopTemp = [
	{
		placement: 0,
		iterations: 3,
		name: "Verse",
		progression: ["A_maj", "C_maj", "B_maj", "F_maj"]
	},
	{
		placement: 1,
		iterations: 3,
		name: "Chorus",
		progression: ["G_min", "C_maj", "B_min", "F_sharp_min"]
	},
	{
		placement: 2,
		iterations: 3,
		name: "Bridge",
		progression: ["A_min", "C_maj", "A_sharp", "F_minor"]
	}
]

// const loopTemp = [

// ]



const LoopBox = ({useMode, useKey}) => {
	const [currProj, setProj] = useState(loopTemp)
	
	// At the moment, this useEffect will undisirably reset changes to the website,
	// In the future, we'll need this to set the stage for changes
	// useEffect(() => {
	// 	// In the final result, this data will come from an API call
	// 	setProj(loopTemp)
	// })

	const addNewLoop = () => {
		console.log("in here")
		let temp = [...currProj]
		// let temp = currProj
		let len = temp.length
		temp.push(
			{
				placement: len,
				name: "Another Loop",
				progression: ["A_min", "C_maj", "A_sharp", "F_min"]
			}
		)

		console.log(temp)
		setProj(temp)
	}

	const deleteLoop = (index) => {
		console.log("In delete loop")
		let temp = [...currProj]

		if (index === -1)
			return
			
		temp.splice(index, 1)
		setProj(temp)
	}

	// 'user/${userID}/get-projects'
	// 60e3a8a3b2bfc802215b2535
	const getData = () => {
		let userID = "60ebdf0a171f280086b81f57"
		const res = axios.get(`https://chordeo-grapher.herokuapp.com/${userID}/get-projects`)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})  
	}

	
	const getProjectById = async () => {
		let userID = "60ebdf0a171f280086b81f57"

		const res = await axios.post("https://chordeo-grapher.herokuapp.com/get-project",
			{
				pid: "60ebdfaa171f280086b81f5f"

				
			}
		)
		
		// console.log(res)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})
	}

	return (
		<div>

			<Button
				onClick={getData}
			>
				Get data
			</Button>

			<Button
				onClick={getProjectById}
			>
				Get specific project
			</Button>

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
						title="Project Name"
						subheader="Created on March 5, 2000"
					/>

					<Button variant="contained" color="secondary" onClick={addNewLoop}><MusicNoteIcon /> New Loop</Button>
					{/* <Button variant="contained" color="secondary" onClick={() => console.log(currProj)}><MusicNoteIcon /> Test</Button> */}
					
					<CustomModal body={<ChordSelector progression={null}/>} />
				
					<Grid container direction="column" style={{width: 500}}>
						{
							// Th
							// 0 1 2 3 4 etc
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
					
					<Login_SignUp style={{paddingTop:'25px', textAlign: 'center'}} buttonText="Save Progression and Sign Up"/>
				</CardContent>
			</Card>

		</div>
	)
}

export default LoopBox
