import { 
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Paper,
	Typography
} from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from './AudioPlayer';
import ProgLoop from './ProgLoop'
import Chordbox from './Chordbox';
import SwapInfo from './SwapInfo'
import getAllSuggestions from '../Script/Suggest'
import getChordNotes from '../Script/ChordToNote';
import { dillonNoteToSoundfont, dillonNoteToTone } from '../Script/Convert';
import SuggestList from './SuggestList';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}


const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 500,
		height: 500,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const ChordSelector = ({loopData, setProj, key, mode}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [customLoop, setCustom] = useState([])
	const [suggestions, setSuggest] = useState([])
	const [selectedIndex, setSelected] = useState(1)
	// const samplerRef = useRef(sampler)
	// Handles what position in the progression that we are working in
	const [toEdit, setEdit] = useState(1)

	const [isLoaded, setLoaded] = useState(false)
	const reset = loopData

	// This will trigger the suggestion function for this particular chord progression
	useEffect(() => {
		
		const {placement, iterations, progression, name} = loopData
		console.log("In here")

		// Set the progression that we can then customize
		setCustom(progression)
		// setSuggest(getAllSuggestions(...chords, toEdit, "C", 1))
		const res = getAllSuggestions(...progression, toEdit, "C", 1)
		console.log(res)

		// Save the returned list of suggestions into state
		setSuggest(res)
		setSelected(0)
		
	}, [toEdit])


	const handleListClick = (event, index) => {
	
		console.log("In handleListClick")
		// console.log(event.target.value)
		// playChord(suggestions[index])
		// logNotes(suggestions[index])
		console.log(index)
		setSelected(index);
	};

	// const playChord = (chord) => {
		
	// 	let rawNotes = getChordNotes(chord)
	// 	let convertNotes = rawNotes.map(note => dillonNoteToTone(note)+"4")
	// 	// let convertNotes = rawNotes.map(note => rawNotes+"4")
	// 	playChordHelper(convertNotes)
		 


	return (
		<div>
			{/* We need to display all 4 chords */}

			{/* Make them selectable */}

			{/* Highlight the ones adjacent to it */}

			{/* Render out Dillon's function return */}
			
			<div style={modalStyle} className={classes.paper}>
				<Button onClick={null}>
					Testy
				</Button>
				<Grid container direction="column">
					<Grid item>
						<AudioPlayer progression={loopData.progression}/>
					</Grid>

					<Grid item>
						<Grid container style={{ justifyContent: 'center' }}>
							{

								loopData && loopData.progression.map((singleChord, position) => {
									return (
										<Grid item style={{ width: 80 }}>
											<Chordbox
												chord={singleChord}
												position={position}
												loop={loopData}
												setEdit={setEdit}
											/>
										</Grid>
									)
								})
								
							}

						</Grid>	
					</Grid>

					<Grid item>
						<Grid container direction="row">
							<Grid item>
								<SuggestList 
									suggestions={suggestions} 
									selectedIndex={selectedIndex} 
									handleListClick={handleListClick}
								/>
							</Grid>
							<Grid item>
								<SwapInfo beforeChord={loopData.progression[toEdit - 1]} afterChord={suggestions[selectedIndex]} />
							</Grid>
						</Grid>

					</Grid>

				</Grid>
			</div>
		</div>
	)
}

export default ChordSelector
