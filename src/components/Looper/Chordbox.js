import React from 'react'
import {
	Card,
	CardHeader,
	CardContent
} from '@material-ui/core'

export const Chordbox = ({chord}) => {
	return (
		<div>
			<Card>
				<CardHeader title={chord} />	
				
			</Card>
		</div>
	)
}
