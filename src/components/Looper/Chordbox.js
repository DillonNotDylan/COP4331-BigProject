import React from 'react'
import {
	Card,
	CardHeader,
	CardContent
} from '@material-ui/core'
import getAllSuggestions from '../Script/Suggest'
// import test from '../Script/Suggest'
import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
// 	root: {
// 		background: 'linear-gradient()',
		
// 	}
// })

const Chordbox = ({chord, position, loop}) => {
	return (
		<div onClick={() => {
				console.log(chord + " " + position)
				console.log(loop)
			getAllSuggestions("C", "D", "E", "F", 3, "C", 1)
			}
		}>
			<Card>
				<CardHeader title={chord} />	
				
			</Card>
		</div>
	)
}

export default Chordbox


