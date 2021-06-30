import React from 'react'
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
		name: "Verse",
		chords: ["Am, C, B, F"]
	},
	{
		name: "Chorus",
		chords: ["Gm, C7, Bm, F#m"]
	},
	{
		name: "Bridge",
		chords: ["Am, C, Bb, Fm"]
	}
]

const LoopBox = () => {
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
						<Button variant="contained" color="secondary"><MusicNoteIcon /> New Loop</Button>
						
					
						<Grid container>
							{
								loopTemp.map((loop) => {
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
