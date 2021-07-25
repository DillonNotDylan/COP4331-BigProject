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

const ProgLoop = ({loopData, id, deleteLoop, previewFlag}) => {
	// const [title, setTitle] = useState("")



	const playProgression = () => {
		const ac = new AudioContext();
		let plyr = null;

		Soundfont.instrument(ac, 'acoustic_grand_piano', { loop: false, adsr: [0, 0, 1, 0] },).then(function (instrument) {
			instrument.schedule(ac.currentTime,
				[{ time: 0, note: "C4" }, { time: 0, note: "E4" }, { time: 0, note: "G4" },
				{ time: .5, note: "A4" }, { time: .5, note: "E4" }, { time: .5, note: "C4" },
				{ time: 1, note: "A4" }, { time: 1, note: "F4" }, { time: 1, note: "C4" }]
			)
		}

		).catch(function (err) {
			console.log('err', err);
		});

		// plyr.play(30);

	}

	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<ButtonGroup>
								<AudioPlayer progression={loopData.progression}/>

								{ !previewFlag && 
								<CustomModal loopData={loopData}/>
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
