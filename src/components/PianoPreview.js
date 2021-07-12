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

const PianoPreview = () => {
	const classes = useStyles();
	// const ref = useRef()

	// webkitAudioContext fallback needed to support Safari
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

	const noteRange = {
		first: MidiNumbers.fromNote('c3'),
		last: MidiNumbers.fromNote('b4'),
	};
	const keyboardShortcuts = KeyboardShortcuts.create({
		firstNote: noteRange.first,
		lastNote: noteRange.last,
		keyboardConfig: KeyboardShortcuts.HOME_ROW,
	});
	return (
		<div>
			{/* <Card className={classes.root}>
				<CardContent> */}
					<Button
						onClick={new KeyboardEvent('keypress', {
							key: 'a',
						})}
					>
						Testing sound
					</Button>
					<SoundfontProvider
						instrumentName="acoustic_grand_piano"
						audioContext={audioContext}
						hostname={soundfontHostname}
						render={({ isLoading, playNote, stopNote }) => (
							<Piano
								noteRange={noteRange}
								width={500}
								playNote={playNote}
								stopNote={stopNote}
								disabled={false}
								keyboardShortcuts={keyboardShortcuts}
								
							/>
						)}
					/>
				{/* </CardContent>
			</Card> */}
		</div>
	)
}

export default PianoPreview
