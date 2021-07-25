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

const ProgLoop = ({loopData, id, deleteLoop}) => {
	// const [title, setTitle] = useState("")
	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<IconButton
								onClick={() => deleteLoop(id)}
							>
								<DeleteOutlined />
							</IconButton>
						}
						
						subheader={loopData.name}
						
					/>

					<CardContent>
						<Grid container style={{justifyContent: 'center'}}>
							{
								loopData.progression.map(singleChord =>
									{
										return (
											<Grid item style={{width: 100}}>
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
