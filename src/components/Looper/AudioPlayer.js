import React, { useState, useEffect } from 'react'

import { Button, IconButton } from '@material-ui/core';

import PauseOutlined from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import { Howl } from 'howler';
import getChordNotes from '../Script/ChordToNote';
import { dillonNoteToExt } from '../Script/Convert';



const AudioPlayer = ({progression}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [tempo, setTempo] = useState(80);
	const [volNum, setVolNum] = useState(50);
	const [counter, setCounter] = useState(0);
	const [progNotes, setProgNotes] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
	
	//set BPM
	let bpm = (60 * 1000 / 4) / tempo;
	
	
	useEffect(() => {
		// Every time the progression updates, change what this audio player
		// plays

		// We only want to time chords in a 4:4 manner, so we only
		// play a chord on beats 0, 4, 8, 12
		let beat = 0
		let tempArr = [...progNotes]
		// console.log(progression)
		progression.map((chord) => {
			// Take every chord in this progression, and turn it into
			// an array of notes with Dillon's code
			let rawNotes = getChordNotes(chord)
			let noteList = rawNotes.map(note => dillonNoteToExt(note) + "4")
			tempArr[beat] = noteList;
			beat = beat + 4;
		})

		setProgNotes(tempArr)
	
		// console.log(isPlaying)
		if (isPlaying === true) {
			const interval = setInterval(() => {
				loop();
	
				if (counter < 15)
					setCounter((prevState) => ++prevState)
				else
					setCounter(0)
			}, bpm)
			return () => clearInterval(interval)
		}
		setCounter(0)
	}, [progression, isPlaying, bpm, volNum, counter])

	
	//ParseInt() as tempo field currently a string
	const handleTempoChange = (event) => {
		const eventValue = event.target.value;
		setTempo(parseInt(eventValue));
	};
	
	const playSound = (source) => {

		console.log("Playing sound")
		// console.log(source)
		var sound = new Howl({
			src: [source],
			html5: true,
			volume: volNum / 100,
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
	const loop = () => {
			// Array that holds the notes
			// Loop through the notes in a triad
			// If the measure at the counter isn't false, there's a chord
			// to play there

			if (progNotes[counter]) {
				let soundArr = progNotes[counter].map(note => {
					
					// console.log(notesInChord)
					
						return (
							"./PianoSamples/" + note + ".mp3"
						)	
				})
				// console.log(soundArr)
				playSounds(soundArr)
				
			}
			
	}
	
	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};


	return (
		<div>
			{/* <Button onClick={togglePlay}>
				Test Out Loop
			</Button> */}
			<IconButton onClick={togglePlay}>
				{
					isPlaying ? <PauseOutlined/> :	<PlayOutlined />
				}
			</IconButton>
			
			
		</div>
	)

}

	

export default AudioPlayer
