import React, {useState, useEffect} from 'react'
import {
	Card,
	CardActions,
	CardHeader,
	CardContent,
	IconButton,
	Grid,
	ButtonGroup,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@material-ui/core'
import DeleteOutlined from '@material-ui/icons/DeleteOutline'
import PlayOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import Chordbox from './Chordbox'
import CustomModal from './CustomModal';
import Soundfont from 'soundfont-player';
import AudioPlayer from './AudioPlayer';
import IconConfirm from '../Tools/IconConfirm';

const ProgLoop = ({deleteLoop, id, loopData, previewFlag, updateLoop}) => {
	const [title, setTitle] = useState("")

	return (
		<div>
				<Card style={{justifyContent: "center", backgroundColor: '#ffe3cf', boxShadow: '8px 8px 15px #c8bcb2, -10px -10px 30px #fffef0', borderRadius: '20px', margin: '3rem'}}>
					<CardHeader
						action={
							<ButtonGroup>
								<AudioPlayer progression={loopData.progression}/>
								{ !previewFlag && 
									<CustomModal 
										id={id}
										loopData={loopData} 
										submitAction={updateLoop}
										addFlag={false}
									/>
								}
								<IconConfirm title={"Delete Loop"} diagText={"Delete this loop?"} thenFunc={() => deleteLoop(id)} />
							</ButtonGroup>
						}
						
						subheader={loopData.name}
						
					/>

					<CardContent>
						<Grid container style={{justifyContent: 'center'}}>
							{
								
								loopData && loopData.progression.map((singleChord, position) =>
									{
										return (
											<Grid item style={{width: 100, margin: '0.5rem'}}>
												<Chordbox 
													chord={singleChord}
													position={position}
													loop={loopData}

													// Don't call edit related functions if all we're doing is click on a chord on the menu
													// Editing should be restricted to when they explicitly click on the pencil edit icon
													setEdit={null}
												/>
											</Grid>
										)
									}
								)
							}
						</Grid>
					</CardContent>

					
				</Card>
		</div>
	)
}



export default ProgLoop
