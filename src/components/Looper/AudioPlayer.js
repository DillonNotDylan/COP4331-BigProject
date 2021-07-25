import React from 'react'
import { Howl } from 'howler';



const AudioPlayer = ({progression}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [tempo, setTempo] = useState(120);
	const [volNum, setVolNum] = useState(50);
	const [counter, setCounter] = useState(0);
	const [triad, setTriad] = useState([])
	
	//set BPM
	let beats = (60 * 1000 / 4) / tempo;

	useEffect(() => {
		if (isPlaying) {
			const interval = setInterval(() => {
				loop();

				if (counter < 15) 
					setCounter((prevState) => ++prevState)
				else
					setCounter(0)
			}, beats)
		}
	}, [progression, isPlaying, beats, volNum, counter])

	// TODO: Refactor player controls into helpers
	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};


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
			playSound(array[i])
			console.log(array[i])
		}
		
		// Get sound samples based on the chords we have
		const loop = () => {
			// Array that holds the notes
			let soundArr = []
	
			// Loop through the notes in a triad
			for (let i = 0; i < 3; i++) {
				// Find out what each note correlates to in our mp3 folder
				let soundSrc = ""
				soundArr.push(soundSrc)
			}
			console.log(soundArr)
			playSounds(soundArr)
		}
	}

	return (
		<div>
		</div>
	)

}

	

export default AudioPlayer
