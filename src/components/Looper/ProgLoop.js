import React from 'react'
import {
	CardHeader,
	Card,
	CardContent,
	IconButton,
	Grid
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { Chordbox } from './Chordbox'

const ProgLoop = (props) => {
	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<IconButton>
								<DeleteOutlined />
							</IconButton>
						}
						
						subheader={props.loopData.name}
						
					/>

					<CardContent>
						<Grid container>
							{
								props.loopData.chords.map(singleChord =>
									{
										return (
											<Grid item>
												<Chordbox chord={singleChord}/>
											</Grid>
										)
									}
								)
							}
						</Grid>
					</CardContent>
				</Card>

			</Card>
		</div>
	)
}



export default ProgLoop
