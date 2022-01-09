import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core'
import SwapOutlined from '@material-ui/icons/SwapHorizOutlined';
import { dillonToDisplay } from '../Script/Convert';

const useStyles = makeStyles({
	root: {
		width: "65%",
		position: 'absolute'
	}
});
const SwapInfo = ({beforeChord, afterChord, description, swapChords}) => {
	const classes = useStyles()

	return (
		<div>
			<Card className={classes.root}>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Swap Out Chord
					</Typography>

					<Typography variant="h6">
						{dillonToDisplay(beforeChord)} <SwapOutlined /> {dillonToDisplay(afterChord)}
					</Typography>

					<Typography variant="body2" component="p">
						{description}
					</Typography>
				</CardContent>

				<CardActions>
					<Button onClick={swapChords}>
						Swap Chords!
					</Button>
				</CardActions>

			</Card>
		</div>
	)
}

export default SwapInfo
