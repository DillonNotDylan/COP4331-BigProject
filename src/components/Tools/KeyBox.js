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
import KeySelect from './KeySelect'

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

export default function KeyBox({currOption, grabKey, grabMode, status, switchStatus}) {

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currKey, setKey] = React.useState("C");

	const handleChange = (event) => {
		setKey(event.target.value);
		grabKey(event.target.value);
	};

	const handleStatus = () =>{
		switchStatus(!status);
		(status) ? grabMode(2) : grabMode(5);
		return status;
	}

	return(
		<div className={cardClasses.divBox}>
			<Card className={cardClasses.root}>
				<FormControl variant="outlined" className={boxClasses.formControl}>
					<InputLabel className={boxClasses.formControl} id="key-label">Key</InputLabel>
					{/* <Select className={boxClasses.formControl}
						value={currKey}
						onChange={handleChange}
						label="Key"
					>
						<MenuItem value={"A"}>A</MenuItem>
						<MenuItem value={"A_sharp"}>A#</MenuItem>
						<MenuItem value={"B"}>B</MenuItem>
						<MenuItem value={"C"}>C</MenuItem>
						<MenuItem value={"C_sharp"}>C#</MenuItem>
						<MenuItem value={"D"}>D</MenuItem>
						<MenuItem value={"D_sharp"}>D#</MenuItem>
						<MenuItem value={"E"}>E</MenuItem>
						<MenuItem value={"F"}>F</MenuItem>
						<MenuItem value={"F_sharp"}>F#</MenuItem>
						<MenuItem value={"G"}>G</MenuItem>
						<MenuItem value={"G_sharp"}>G#</MenuItem>
						
					</Select> */}
						<KeySelect styling={boxClasses.formControl} currKey={currKey} handleChange={handleChange} />
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
							onClick={handleStatus}
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