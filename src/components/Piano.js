import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 100,
		maxWidth: 500,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
});

const Piano = () => {
	const classes = useStyles();
	return (
		<div>
			<Card className={classes.root}>
				<CardContent>
					
				</CardContent>
			</Card>
		</div>
	)
}

export default Piano
