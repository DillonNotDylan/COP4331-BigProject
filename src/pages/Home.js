import React from 'react'
import NavBar from '../components/NavBar'
import Piano from '../components/Piano'
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Grid
} from "@material-ui/core"
import LoopBox from '../components/Looper/LoopBox'



const Home = () => {
	return (
		<div>
	
			<NavBar />
			<Piano />
			<LoopBox />
		
		</div>
	)
}

export default Home
