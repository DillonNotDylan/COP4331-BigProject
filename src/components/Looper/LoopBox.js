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

const loopTemp = [
	{
		placement: 0,
		name: "Verse",
		chords: ["Am", "C", "B", "F"]
	},
	{
		placement: 1,
		name: "Chorus",
		chords: ["Gm", "C7", "Bm", "F#m"]
	},
	{
		placement: 2,
		name: "Bridge",
		chords: ["Am", "C", "Bb", "Fm"]
	}
]


const LoopBox = () => {
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
				chords: ["Am", "C", "Bb", "Fm"]
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
		const res = axios.get(`https://chordeographer.herokuapp.com/${userID}/get-projects`)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		})  
	}

	
	const getProjectById = async () => {
		let userID = "60ebdf0a171f280086b81f57"

		const res = await axios.post("https://chordeographer.herokuapp.com/get-project",
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
					
					<Login_SignUp />
				</CardContent>
			</Card>

		</div>
	)
}

export default LoopBox
