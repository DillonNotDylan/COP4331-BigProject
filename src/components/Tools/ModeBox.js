import React from 'react'
import {
	Card,
	FormControlLabel,
	makeStyles,
	Checkbox,
	Typography,
	Slider,
	Grow
} from '@material-ui/core'


const cardStyles = makeStyles({
	root: {
		alignContent: 'center',
		padding: '25px',
		minWidth: '150px',
		display: 'flex',
		width: 750,
		height: '56px'
	},

	child: {
		height: 45,
		width: 200,
		minWidth: '150px',
		display: 'auto',
		marginLeft: 45,
		marginRight: 70,
	},

	check: {
		alignItems: 'center',
		padding: '25px',
		minWidth: '120px',
		display: 'flex',
		width: 120,
		height: '56',
		marginLeft: 18
	}	
});

const boxStyles = makeStyles({
	sectionBox: {
		display: 'flex',
		height: 10,
	},

	divBox: {
		display: "flex",
		justifyContent: 'flex-end',
		// height: '106px',
		// alignContent: "auto",
	},

	advanced: {
		justifyContent:"auto",
		width: 50,
		height: 40,
		marginLeft: 20,
		// marginRight: 50
	},

	modeLabel: {
		height: 1,
		marginLeft: 25
	},

	slide: {
		display: 'center',
		marginLeft: 10,
		marginTop: 15,
		width: 400,
		// height: 1

	}
});

const marks = [
	{
		value: 0,
		label: 'Happy',
		mode: 'Ionian'
	},
	{
		value: 1,
		mode: "Dorian"
	},
	{
		value: 2,
		mode: "Phrygian"
	},
	{
		value: 3,
		mode: "Lydian"
	},
	{
		value: 4,
		mode: 'Myxolydian'
	},
	{
		value: 5,
		mode: "Aeolian"
	},
	{
		value: 6,
		label: "Sad",
		mode: "Locrian"
	}
]

export default function ModeBox ({setOption, grabMode, status, switchStatus}){

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currMode, setMode] = React.useState('Ionian'); // lists options of modes
	const[modeState, modeSwitch] = React.useState(false); // enables option for mode

	const handleOption = (event, val) => {

		let temp = marks[val].mode;
		setMode(temp);
		grabMode(marks[val].value);
	};

	const handleCheck = () => {
		setToSwitchVal();

		modeSwitch(!modeState);
		setOption(modeState);
		setToSwitchVal();

	}

	const setToSwitchVal = () => {
		if (!status) {
			grabMode(5);
			setMode(marks[5].mode);
		}
		else {
			grabMode(2);
			setMode(marks[2].mode);
			switchStatus(status);
		}	
	}

	function valueLabelFormat(value) {
		return marks.findIndex((mark) => mark.value === value) + 1;
	  }

	return(
		<div className={boxClasses.divBox} style={{width: '95.75%'}}>
			<Grow in={modeState} timeout={500}>
				<Card className={cardClasses.root}>
					<div className={boxClasses.sectionBox}>
						<Card className={cardClasses.child}>
							<FormControlLabel
								value="Mode"
								control={
									<Typography 
										variant="body1"
										className={boxClasses.modeLabel}
									>
										{currMode}
									</Typography>
								}		
							/>
						</Card>

						<Slider
							className={boxClasses.slide}
							color="secondary"
							defaultValue={5}
							min={0}
							max={6}
							aria-labelledby="discrete-slider-restrict"
							step={null}
							marks={marks}
							valueLabelDisplay="auto"
							valueLabelFormat={valueLabelFormat}
							track='false'
							key={5}
							onChange={handleOption}
						/>
					</ div>
				</Card>
			</Grow>

			<Card className={cardClasses.check}>
				<FormControlLabel
					className={boxClasses.advanced}
					value="ModeCheck"
					control={
						<Checkbox
							color="secondary"
							onChange={handleCheck}
							checked={modeState}
						/>
					}
					label="Mode"
					labelPlacement="end"
				/>
			</Card>
		</div>
	)
}