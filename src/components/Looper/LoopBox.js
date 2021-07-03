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
	const [currProj, setProj] = useState([])
	
	// At the moment, this useEffect will undisirably reset changes to the website,
	// In the future, we'll need this to set the stage for changes
	// useEffect(() => {
	// 	// In the final result, this data will come from an API call
	// 	setProj(loopTemp)
	// })

	const addNewLoop = () => {
		console.log("in here")
		let temp = [...currProj]
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

	
	return (
		<div>
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
						<Button variant="contained" color="secondary" onClick={() => console.log(currProj)}><MusicNoteIcon /> Test</Button>
						
					
						<Grid container>
							{
								currProj.map((loop) => {
									return (
										<Grid item>
											<ProgLoop loopData={loop}/>
										</Grid>
									)
								})
							}
						</Grid>
					
					{/* <ProgLoop /> */}
				</CardContent>
			</Card>
		</div>
	)
}

export default LoopBox
