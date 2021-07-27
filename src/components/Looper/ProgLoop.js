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

const ProgLoop = ({deleteLoop, id, loopData, pProject, previewFlag, setcProject, updateLoop}) => {
	// const [title, setTitle] = useState("")

	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<ButtonGroup>
								{/* <AudioPlayer progression={loopData.progression}/> */}

								{ !previewFlag && 
									<CustomModal 
										id={id}
										loopData={loopData} 
										pProject={pProject}
										setcProject={setcProject}
										updateLoop={updateLoop}
									/>
								}
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
								
								loopData && loopData.progression.map((singleChord, position) =>
									{
										return (
											<Grid item style={{width: 80}}>
												<Chordbox 
													chord={singleChord}
													position={position}
													loop={loopData}
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

			</Card>
		</div>
	)
}



export default ProgLoop
