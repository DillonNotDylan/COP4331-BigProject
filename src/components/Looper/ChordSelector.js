import { 
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Paper,
	TextField,
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

const ChordSelector = ({id, loopData, submitAction, addFlag}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	// A state that controls a temp version of the progression we are creating/editing
	const [customLoop, setCustom] = useState([...loopData.progression])

	// Holds the current list of suggestions for the currently selected chord
	const [suggestions, setSuggest] = useState([])

	// The index of the chord we are currently choosing to index.
	const [selectedIndex, setSelected] = useState(0)
	
	// Handles what position in the progression that we are working in
	const [toEdit, setEdit] = useState(0)

	const [loopName, setLoopName] = useState(loopData.name || "")

	const [tempKey, setTempKey] = useState()

	const [tempMode, setTempMode] = useState()


	// This will trigger the suggestion function for this particular chord progression
	// If we swap out a chord, the present chord's current list of suggestions will be
	// inaccurate; reload its suggestion

	useEffect(() => {
		
		console.log((loopData.progression))

		// Dillon's functions use 1-indexing, so bump this number up by 1
		console.log(toEdit+1)
		const res = getAllSuggestions(...customLoop, toEdit + 1, "C", 1)
		setTempKey(loopData.key)
		setTempMode(loopData.mode)

		// Save the returned list of suggestions into state
		setSuggest(res)
		setSelected(0)
		
	}, [toEdit, customLoop])


	const handleListClick = (event, index) => {
	
		console.log("In handleListClick")
		// console.log(event.target.value)
		// playChord(suggestions[index])
		// logNotes(suggestions[index])
		console.log(index)
		setSelected(index);
	};

	// Takes a chord in the progression, and swaps it out with a selected chord from the
	// suggestions list
	const swapChords = () => {
		let temp = [...customLoop]
		temp[toEdit] = suggestions[selectedIndex]
		setCustom(temp)
	}


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
						<TextField
							value={loopName}
							onChange={e => setLoopName(e.target.value)}
						>
						</TextField>
					</Grid>
					{
						customLoop &&
						<Grid item>
							<AudioPlayer progression={customLoop}/>
						</Grid>
					}

					<Grid item>
						<Grid container style={{ justifyContent: 'center' }}>
							{

								loopData && customLoop.map((singleChord, position) => {
									return (
										<Grid item style={{ width: 80 }}>
											<Chordbox
												chord={singleChord}
												position={position}
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
								
								<SwapInfo beforeChord={customLoop[toEdit]} afterChord={suggestions[selectedIndex]} swapChords={swapChords}/>
							</Grid>
						</Grid>

					</Grid>

					<Grid item justify="flex-end">
						{addFlag ?
							<Button
								onClick={() => submitAction(customLoop, loopName)}
							>
								Submit
							</Button>
								:
								<Button
									// If we are updating, we need to know what index to replace
									onClick={() => submitAction(id, customLoop, loopName)}
								>
									Update
								</Button>
						}
					</Grid>

				</Grid>
			</div>
		</div>
	)
}

export default ChordSelector
