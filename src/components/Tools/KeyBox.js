import React from 'react'
import {
	Card,
	FormControl,
	Typography,
	InputLabel,
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
		<div className={cardClasses.divBox} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<Card className={cardClasses.root} style={{margin: '5%', width: '80%', borderRadius: '10px'}}>
				<FormControl variant="outlined" className={boxClasses.formControl} style={{width: '100%'}}>
					<InputLabel className={boxClasses.formControl} id="key-label">Key</InputLabel>
					<KeySelect styling={boxClasses.formControl} currKey={currKey} handleChange={handleChange} />
				</FormControl>
			</Card>

			<Card className={cardClasses.quality} style={{marginBottom: '1.25rem', width: '80%', borderRadius: '10px'}}>
				<Grid
					component="label"
					container
					alignItems="center"
					spacing={1}
					style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
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