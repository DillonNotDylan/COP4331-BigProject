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
import getAllDescriptions from '../Script/Suggest2'
import getChordNotes from '../Script/ChordToNote';
import { dillonToDisplay } from '../Script/Convert';
import SuggestList from './SuggestList';
import KeySelect from '../Tools/KeySelect';
import {Note} from '@tonaljs/tonal'
import Confirm from '../Tools/Confirm';
import ModeSelect from '../Tools/ModeSelect'


function getModalStyle() {
	const top = 40;
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
		width: 600,
		height: 600,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const ChordSelector = ({id, loopData, submitAction, addFlag, parentHandleClose}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);


	// A state that controls a temp version of the progression we are creating/editing
	const [customLoop, setCustom] = useState([...loopData.progression])

	// Holds the current list of suggestions for the currently selected chord
	const [suggestions, setSuggest] = useState([])

	const [descriptions, setDescriptions] = useState([])

	// The index of the chord we are currently choosing to index.
	const [selectedIndex, setSelected] = useState(0)
	
	// Handles what position in the progression that we are working in
	const [toEdit, setEdit] = useState(0)

	const [loopName, setLoopName] = useState(loopData.name || "")


	const [useKey, grabKey] = React.useState(loopData.key);
	const [useMode, grabMode] = React.useState(loopData.mode);


	// This will trigger the suggestion function for this particular chord progression
	// If we swap out a chord, the present chord's current list of suggestions will be
	// inaccurate; reload its suggestion

	useEffect(() => {
		
		console.log((loopData.progression))

		// Dillon's functions use 1-indexing, so bump this number up by 1
		console.log(toEdit+1)
		console.log(useKey)
		console.log(useMode)
		const res = getAllSuggestions(...customLoop, toEdit + 1, useKey, useMode)
		const res2 = getAllDescriptions(...customLoop, toEdit + 1, useKey, useMode)
		
		console.log(loopData)
		// grabKey(loopData.key)
		// grabMode(loopData.mode)

		// Save the returned list of suggestions into state
		setSuggest(res)
		setDescriptions(res2)
		setSelected(0)
		
	}, [toEdit, customLoop, useKey, useMode])

	const refreshSugg = () => {
		const res = getAllSuggestions(...customLoop, toEdit + 1, useKey, useMode)
		const res2 = getAllDescriptions(...customLoop, toEdit + 1, useKey, useMode)
		setSuggest(res)
		setDescriptions(res2)

	}


	const handleListClick = (event, index) => {
		setSelected(index);
	};

	// Takes a chord in the progression, and swaps it out with a selected chord from the
	// suggestions list
	const swapChords = () => {
		let temp = [...customLoop]
		temp[toEdit] = suggestions[selectedIndex]
		setCustom(temp)
	}


	return (
		<div>

			<div style={modalStyle} className={classes.paper}>

				<Grid container direction="column" spacing={2}>

					<Grid item>
						<TextField
							label="Loop Title"
							value={loopName}
							onChange={e => setLoopName(e.target.value)}
						>
						</TextField>
					</Grid>

					<Grid item>
						<KeySelect styling={""} currKey={useKey} handleChange={e => grabKey(e.target.value)}/>
					</Grid>
					<Grid item>
						<ModeSelect useMode={useMode} handleChange={e => grabMode(e.target.value)} />
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
								<Button onClick={refreshSugg}>
									Refresh Suggestions
								</Button>
							</Grid>
					<Grid item>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<SuggestList 
									suggestions={suggestions} 
									selectedIndex={selectedIndex} 
									handleListClick={handleListClick}
								/>
							</Grid>
							<Grid item>
								
								<SwapInfo beforeChord={customLoop[toEdit]} afterChord={suggestions[selectedIndex]} description={descriptions[selectedIndex]} swapChords={swapChords}/>
							</Grid>
						</Grid>

					</Grid>

					<Grid item>
						{addFlag ?
							// <Button
							// 	onClick={() => submitAction(customLoop, loopName)}
							// >
							// 	Submit
							// </Button>
							<Confirm title={"Submit New Loop"} diagText={"Are you sure you wish to add this as a new loop?"} thenFunc={() => {submitAction(customLoop, loopName, useMode, useKey); parentHandleClose()}} />
								:
								// <Button
								// 	// If we are updating, we need to know what index to replace
								// 	onClick={() => submitAction(id, customLoop, loopName)}
								// >
								// 	Update
								// </Button>
							<Confirm title={"Update Loop"} diagText={"Are you sure you wish to update this loop?"} thenFunc={() => { submitAction(id, customLoop, loopName, useMode, useKey); parentHandleClose()}} />
						}

					</Grid>

				</Grid>
			</div>
		</div>
	)
}

export default ChordSelector
