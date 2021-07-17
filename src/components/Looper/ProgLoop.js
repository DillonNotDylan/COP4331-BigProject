import React from 'react'
import {
	CardHeader,
	Card,
	CardContent,
	IconButton,
	Grid,
	ButtonGroup
} from '@material-ui/core'
import DeleteOutlined from '@material-ui/icons/DeleteOutline'
import AddIcon from '@material-ui/icons/Add';
import Chordbox from './Chordbox'

const ProgLoop = ({loopData, id, deleteLoop}) => {
	// const [title, setTitle] = useState("")
	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<ButtonGroup>
								<IconButton
									onClick={() => console.log("I've been clicked!")}
								>
									<AddIcon />
								</IconButton>
								<IconButton
									onClick={() => deleteLoop(id)}
								>
									<DeleteOutlined />
								</IconButton>

							</ButtonGroup>
						}
						
						subheader={loopData.name}
						
					/>

					<CardContent>
						<Grid container style={{justifyContent: 'center'}}>
							{
								
								loopData.chords.map((singleChord, position) =>
									{
										return (
											<Grid item style={{width: 100}}>
												<Chordbox 
													chord={singleChord}
													position={position}
													loop={loopData}
												/>
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
