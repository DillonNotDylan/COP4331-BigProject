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

const useStyles = makeStyles({
	root: {
		width: "65%",
		position: 'absolute'
	}
});
const SwapInfo = ({beforeChord, afterChord, swapChords}) => {
	const classes = useStyles()

	return (
		<div>
			<Card className={classes.root}>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Swap Out Chord
					</Typography>

					<Typography variant="h6">
						{beforeChord} <SwapOutlined /> {afterChord}
					</Typography>

					<Typography variant="body2" component="p">
						Put in a description by Dillon here in this paragraph. Write about why a certain chord was suggested
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
