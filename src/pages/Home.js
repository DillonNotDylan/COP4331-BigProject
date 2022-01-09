import React from 'react'
import NavBar from '../components/NavBar'

import NavBar2 from '../components/NavBar2'
// import PianoPreview from '../components/PianoPreview'
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Grid
} from "@material-ui/core"
import ControlPanel from '../components/ToolControl/ControlPanel'

const Home = () => {
	return (
		<div>	
			{/* <NavBar /> */}
			<NavBar2 />
			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
				<ControlPanel />
			</div>
		
		</div>
	)
}

export default Home
