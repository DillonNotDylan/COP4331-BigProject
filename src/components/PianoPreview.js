import React from 'react'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css';
import '../css/pianoOverride.css'
import SoundfontProvider from './SoundfontProvider';
import Soundfont from 'soundfont-player';

import { Typography } from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles({
	root: {
		minWidth: 100,
		maxWidth: 500,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
});

const test = () => {
	;
}

const PianoPreview = () => {

	const doThing = (tempFunction)=>
	{
		const ac = new AudioContext();
		let plyr = null;
	
		Soundfont.instrument(ac, 'acoustic_grand_piano', {loop: false,adsr: [0, 0, 1, 0]}, ).then(function (instrument) {
			instrument.schedule( ac.currentTime,
					[{ time: 0, note: "C4" }, { time: 0, note: "E4" }, { time: 0, note: "G4" }, 
					{ time: .5, note: "A4" }, { time: .5, note: "E4" }, { time: .5, note: "C4" },
					{ time: 1, note: "A4" }, { time: 1, note: "F4" }, { time: 1, note: "C4" }]
				)
			
			// plyr=instrument;
		}
		
		).catch(function (err) {
			console.log('err', err);
		});

		// plyr.play(30);
	
	}

	// doThing("E4");

	return (
		


		<div>
			{/*
				Soundfont.instrument(new AudioContext(), 'clavinet').then(function (clavinet) {
					clavinet.play('C4');
			})
			*/}
			
			<Button onClick={() => {
					doThing(['c2', 'e3', 'g4'])

				}
			}>
				test
			</Button>			
		</div>
	)
}

// const PianoPreview = () => {
// 	const classes = useStyles();
// 	// const ref = useRef()

// 	// webkitAudioContext fallback needed to support Safari
// 	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// 	const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

// 	const noteRange = {
// 		first: MidiNumbers.fromNote('c3'),
// 		last: MidiNumbers.fromNote('b4'),
// 	};
// 	const keyboardShortcuts = KeyboardShortcuts.create({
// 		firstNote: noteRange.first,
// 		lastNote: noteRange.last,
// 		keyboardConfig: [...KeyboardShortcuts.QWERTY_ROW, 
// 		{
// 			natural: ']',
// 			flat: '-',
// 			sharp: '+'
// 		}],
// 	});
// 	return (
// 		<div>
// 			{/* <Card className={classes.root}>
// 				<CardContent> */}
// 					<Button
// 						onClick={new KeyboardEvent('keypress', {
// 							key: 'a',
// 						})}
// 					>
// 						Testing sound
// 					</Button>

					
// 					<SoundfontProvider
// 						instrumentName="acoustic_grand_piano"
// 						audioContext={audioContext}
// 						hostname={soundfontHostname}
// 						render={({ isLoading, playNote, stopNote }) => (
// 							<Piano
// 								noteRange={noteRange}
// 								width={500}
// 								playNote={(playNote)}
// 								stopNote={stopNote}
// 								disabled={false}
// 								keyboardShortcuts={keyboardShortcuts}
								
// 							/>
// 						)}
// 					/>
// 			<ul class="set">
// 				<li class="white b"></li>
// 				<li class="black as"></li>
// 				<li class="white a"></li>
// 				<li class="black gs"></li>
// 				<li class="white g"></li>
// 				<li class="black fs"></li>
// 				<li class="white f"></li>
// 				<li class="white e"></li>
// 				<li class="black ds"></li>
// 				<li class="white d"></li>
// 				<li class="black cs"></li>
// 				<li class="white c"></li>
// 			</ul>
// 				{/* </CardContent>
// 			</Card> */}
// 		</div>
// 	)
// }

export default PianoPreview
