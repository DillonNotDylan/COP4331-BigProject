// CODE FROM KEVINSQI REACT PIANO

import React from 'react'
import SoundfontProvider from './SoundfontProvider'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';


const noteRange = {
	first: MidiNumbers.fromNote('c3'),
	last: MidiNumbers.fromNote('b4')
}
const PianoPreview = () => {
	return (
		<div>
			<SoundfontProvider
				instrumentName="acoustic_grand_piano"
				audioContext={audioContext}
				hostname={soundfontHostname}
				render={({ isLoading, playNote, stopNote }) => (
					<Piano
						noteRange={noteRange}
						width={300}
						playNote={playNote}
						stopNote={stopNote}
						disabled={isLoading}
						keyboardShortcuts={keyboardShortcuts}
					
					/>
				)}
			/>
		</div>
	)
}

export default PianoPreview
