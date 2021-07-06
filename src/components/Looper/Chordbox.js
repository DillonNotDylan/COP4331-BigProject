import React from 'react'
import {
	Card,
	CardHeader,
	CardContent
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
// 	root: {
// 		background: 'linear-gradient()',
		
// 	}
// })

export const Chordbox = ({chord}) => {
	return (
		<div>
			<Card>
				<CardHeader title={chord} />	
				
			</Card>
		</div>
	)
}
