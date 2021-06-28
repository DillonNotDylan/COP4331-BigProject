import React from 'react'
import NavBar from '../components/NavBar'
import Piano from '../components/Piano'
import ProgLoop from '../components/ProgLoop'
import {
	Grid
} from "@material-ui/core"

const loopTemp = [
	{
		name: "Verse",
		chords: ["Am, C, B, F"]
	},
	{
		name: "Verse",
		chords: ["Am, C, B, F"]
	},
	{
		name: "Verse",
		chords: ["Am, C, B, F"]
	}
]

const Home = () => {
	return (
		<div>
	
			<NavBar />
			<Piano />
		
		</div>
	)
}

export default Home
