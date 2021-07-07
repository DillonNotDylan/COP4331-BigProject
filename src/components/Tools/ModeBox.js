import React from 'react'
import {
	Card,
	CardHeader,
	CardContent,
	FormControl,
    FormControlLabel,
	MenuItem,
	InputLabel,
	Select,
	makeStyles,
    Checkbox
} from '@material-ui/core'

import SliderBox from './SliderBox';

const cardStyles = makeStyles({
	root: {
		marginRight: '90%',
    	padding: '25px',
        minWidth: '150px',
		width: 900,
		display: 'flex'
  	}
});

const boxStyles = makeStyles({
	formControl: {
		alignItems: 'flex',
		display: 'flex',
		width: 250,
	},

	forCheckbox: {
		paddingRight: 50
	},

	advanced: {
		alignItems: 'flex',
		display: 'flex',
		width: 200
	}
});

const ModeBox = () => {

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currMode, setMode] = React.useState(''); // lists options of modes
    const[modeState, modeSwitch] = React.useState(false); // enables option for mode
    
	const handleOption = (event) => {
		setMode(event.target.value);
	};

    const handleCheck = () => {
        modeSwitch(!modeState);
    }

	return(
		<div>
			<Card className={cardClasses.root}>
                <FormControlLabel
					className={boxClasses.forCheckbox}
                    value="Mode"
                    control={
					<Checkbox
						color="secondary"
						onChange={handleCheck}
						checked={modeState}
					/>
				}
                    label="Mode"
                    labelPlacement="start"
                />

				<FormControl
					variant="outlined" 
					className={boxClasses.formControl}
					disabled={!modeState}
				>
					
            		<InputLabel className={boxClasses.advanced} id="key-label">Mode</InputLabel>
            		<Select 
						className={boxClasses.advanced}
                		value={currMode}
						onChange={handleOption}
						label="Mode"
					>
						<MenuItem value={6}>Lydian</MenuItem>
						<MenuItem value={5}>Ionian</MenuItem>
						<MenuItem value={4}>Mixolydian</MenuItem>
						<MenuItem value={3}>Dorian</MenuItem>
						<MenuItem value={2}>Aeolian</MenuItem>
						<MenuItem value={1}>Phrygian</MenuItem>
						<MenuItem value={0}>Locrian</MenuItem>
					</Select>

				</FormControl>
			<SliderBox disableSlider={!modeState}/>

			</Card>

		</div>
	)
}

export default ModeBox