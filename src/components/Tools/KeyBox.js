import React from 'react'
import {
	Card,
	FormControl,
	Typography,
	MenuItem,
	InputLabel,
	Select,
	Switch,
	makeStyles,
	Grid
} from '@material-ui/core'

const boxStyles = makeStyles({
	formControl: {
		display: 'flex',
	},
	quality: {
		width: 50
	}
});

const cardStyles = makeStyles({
	root: {
		width: 50,
		padding: '25px',
		minWidth: '150px',
	},

	quality: {
		alignContent: 'flex',
		padding: '25px',
		marginLeft: 15,
		display:"flex",
		width: 170,
		minwidth: 160 
	},

	divBox: {
		flexDirection: "row",
		display: "flex",
	}

});

export default function KeyBox({currOption, grabKey, grabMode}) {

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currKey, setKey] = React.useState('');
	const[status, switchStatus] = React.useState(false);

	const handleChange = (event) => {
		setKey(event.target.value);
		grabKey(currKey);
	};

	const handleStatus = () =>{
		switchStatus(!status)
		if (status) grabMode(5);
		else grabMode(1);
		
	}

	return(
		<div className={cardClasses.divBox}>
			<Card className={cardClasses.root}>
				<FormControl variant="outlined" className={boxClasses.formControl}>
					<InputLabel className={boxClasses.formControl} id="key-label">Key</InputLabel>
					<Select className={boxClasses.formControl}
						value={currKey}
						onChange={handleChange}
						label="Key"
					>
						<MenuItem value={1}>C</MenuItem>
						<MenuItem value={2}>C#</MenuItem>
						<MenuItem value={3}>D</MenuItem>
						<MenuItem value={4}>D#</MenuItem>
						<MenuItem value={5}>E</MenuItem>
						<MenuItem value={6}>F</MenuItem>
						<MenuItem value={7}>F#</MenuItem>
						<MenuItem value={8}>G</MenuItem>
						<MenuItem value={9}>G#</MenuItem>
						<MenuItem value={10}>A</MenuItem>
						<MenuItem value={11}>A#</MenuItem>
						<MenuItem value={12}>B</MenuItem>
					</Select>
				</FormControl>

			</Card>

			<Card className={cardClasses.quality}>
				<Grid
					component="label"
					container
					alignItems="center"
					spacing={1}
				>
					<Grid item>
						<Typography variant="body1">
							Major
						</Typography>
					</Grid>
					<Grid item>
						<Switch
							disabled={currOption}
							onClick={handleQuality}
							color="default"
							inputProps={{ 'aria-label': 'checkbox with default color' }}
						/>
					</Grid>
					<Grid item>
						<Typography variant="body1">
							Minor
						</Typography>
					</Grid>
				</Grid>
			</Card>
		</div>
	)
}