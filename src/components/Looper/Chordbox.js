import React from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	ButtonGroup,
	IconButton,
	CardActionArea,	
} from '@material-ui/core'
import getAllSuggestions from '../Script/Suggest'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutline'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomModal from './CustomModal'
import { dillonToDisplay, dillonNoteToExt } from '../Script/Convert';
import { Howl } from 'howler';
import getChordNotes from '../Script/ChordToNote';




// Convert the formatted chord from Dillon's function into a more user friendly appearance
// A_sharp_min_7 ==> A#min7

// Position refers to this chord's place in the array, 0 indexed
const Chordbox = ({chord, position, loop, setEdit}) => {

	const playSound = (source) => {
		console.log("Playing sound")
		// console.log(source)
		var sound = new Howl({
			src: [source],
			format: 'mp3',
			html5: true,
			volume: 50 / 100,
		});
		sound.play()

	}

	// Loops through our array of collected notes compiled from
	// the main progression
	const playSounds = (array) => {
		for (let i = 0; i < array.length; i++) {
			// if (array[i] === null)
			// 	continue;
			console.log(array[i])
			// array[i].map(note => playSound(note))
			playSound(array[i])
			// console.log(array[i])
		}
	}

	// Get sound samples based on the chords we have
	const playChord = (chord) => {
		// Array that holds the notes
		// Loop through the notes in a triad
		// If the measure at the counter isn't false, there's a chord
		// to play there
		console.log(chord)
		let rawNotes = getChordNotes(chord)
		let noteList = rawNotes.map(note => dillonNoteToExt(note) + "4")

	
			let soundArr = noteList.map(note => {

				// console.log(notesInChord)
				return (
					"./PianoSamples/" + note + ".mp3"
				)
			})
			// console.log(soundArr)
			playSounds(soundArr)
		
			
		// console.log(soundArr)
		playSounds(noteList)
	}

	return (
		<div>
			<CardActionArea onClick={() => {
				// console.log(chord + " " + position)
				console.log("Position: " + (position))
				playChord(chord)
				setEdit !== null && setEdit(position)
			}}>
			{/* <CustomModal /> */}
			
			
				<Card>
					<CardHeader title={dillonToDisplay(chord)} />	

				</Card>
				
			</CardActionArea>
			

		</div>
		
	)
}

export default Chordbox


