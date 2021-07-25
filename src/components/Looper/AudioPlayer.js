import React, { useState, useEffect } from 'react'

import { Button } from '@material-ui/core';


import { Howl } from 'howler';
import getChordNotes from '../Script/ChordToNote';
import { dillonNoteToExt } from '../Script/Convert';



const AudioPlayer = ({progression}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [tempo, setTempo] = useState(120);
	const [volNum, setVolNum] = useState(50);
	const [counter, setCounter] = useState(0);
	const [progNotes, setProgNotes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	
	//set BPM
	let bpm = (60 * 1000 / 4) / tempo;
	
	
	useEffect(() => {
		// Every time the progression updates, change what this audio player
		// plays

		// We only want to time chords in a 4:4 manner, so we only
		// play a chord on beats 0, 4, 8, 12
		let beat = 0
		let tempArr = [...progNotes]
		progression.map((chord) => {
			// Take every chord in this progression, and turn it into
			// an array of notes with Dillon's code
			let rawNotes = getChordNotes(chord)
			let noteList = rawNotes.map(note => dillonNoteToExt(note) + "4")
			console.log(noteList)
			teampArr[beat] = noteList;
			beat = beat + 4;
		})

		setProgNotes(tempArr)
	
		if (isPlaying) {
			const interval = setInterval(() => {
				// loop();
	
				if (counter < 15)
					setCounter((prevState) => ++prevState)
				else
					setCounter(0)
			}, bpm)
		}
		setCounter(0)
	}, [progression, isPlaying, bpm, volNum, counter])

	
	//ParseInt() as tempo field currently a string
	const handleTempoChange = (event) => {
		const eventValue = event.target.value;
		setTempo(parseInt(eventValue));
	};
	
	const playSound = (source) => {
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
			if (array[i] === null)
				continue;
				
			playSound(array[i])
			console.log(array[i])
		}
	}
		
		// Get sound samples based on the chords we have
	const loop = () => {
			// Array that holds the notes
			// Loop through the notes in a triad
		
			let soundArr = progNotes.map(note => {
				if (note !== 0)	{
					return (
						"./PianoSamples/" + note + ".mp3"
					)
				} else {
					return null
				}
			})
			
			console.log(soundArr)
			// playSounds(soundArr)
	}
	
	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};


	return (
		<div>
			<Button onClick={togglePlay}>
				Test Out Loop
			</Button>
		</div>
	)

}

	

export default AudioPlayer
