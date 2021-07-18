import React from 'react'
import NavBar from '../components/NavBar'
// import PianoPreview from '../components/PianoPreview'
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Grid
} from "@material-ui/core"
import ControlPanel from '../components/ToolControl/ControlPanel'



const Home = () => {
	return (
		<div>
	
			<NavBar />
			{/* <PianoPreview /> */}
			<ControlPanel />
		
		</div>
	)
}

export default Home
