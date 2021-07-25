import React from 'react'
import NavBar from '../components/NavBar'
import PianoPreview from '../components/PianoPreview'
<<<<<<< HEAD
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Dialog,
	Grid
} from "@material-ui/core"
=======
>>>>>>> 90f0badb51fdc919c34c3d79ce4cb4831f5d9167
import LoopBox from '../components/Looper/LoopBox'
import ToolPage from'../components/Tools/ToolPage'
import AcctVerification from '../components/AcctVerification'


const Home = () => {

	return (
		<div>
			<AcctVerification/>
			<NavBar />
			<PianoPreview />
			<ToolPage />
			<LoopBox />
		
		</div>
	)
}

export default Home
