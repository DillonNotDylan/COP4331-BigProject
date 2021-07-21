import React from 'react'
import NavBar from '../components/NavBar'
import PianoPreview from '../components/PianoPreview'
import ProgLoop from '../components/Looper/ProgLoop'
import {
	Dialog,
	Grid
} from "@material-ui/core"
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
