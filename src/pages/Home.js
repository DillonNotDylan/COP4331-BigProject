import React from 'react'
import NavBar from '../components/NavBar'
import Piano from '../components/Piano'
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Grid
} from "@material-ui/core"
import LoopBox from '../components/Looper/LoopBox'
import ToolPage from'../components/Tools/ToolPage'


const Home = () => {
	return (
		<div>
	
			<NavBar />
			<Piano />
			<ToolPage />
			<LoopBox />
		
		</div>
	)
}

export default Home
