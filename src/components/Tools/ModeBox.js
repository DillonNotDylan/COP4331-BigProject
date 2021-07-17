import React from 'react'
import {
	Card,
	FormControlLabel,
	makeStyles,
	Checkbox,
	Typography,
	Slider
} from '@material-ui/core'

const cardStyles = makeStyles({
	root: {
		alignContent: 'center',
		marginTop: 4,
    	padding: '30px',
    	minWidth: '150px',
		display: 'flex',
		width: 950
  	},
	
	child: {
		height: 45,
		width: 200,
		display: 'auto',
		marginLeft: 45,
		marginRight: 100,
	}
	
});

const boxStyles = makeStyles({
	sectionBox: {
		display: 'flex',
		height: 1
	},

	advanced: {
		width: 50,
		height: 40,
		marginLeft: 50,
		marginRight: 60
	},

	modeLabel: {
		height: 1,
		marginLeft: 25
	},

	slide: {
		display: 'center',
		marginLeft: 10,
		width: 400

	}
});

const marks = [
    {
        value: 0,
        label: 'Sad',
        mode: 'Locrian'
    },
    {
        value: 1,
        mode: 'Phrygian'
    },
    {
        value: 2,
        mode: 'Aeolian'
    },
    {
        value: 3,
        mode: 'Dorian'
    },
    {
        value: 4,
        mode: 'Myxolydian'
    },
    {
        value: 5,
        mode: 'Ionian'
    },
    {
        value: 6,
        label: 'Happy',
        mode: 'Lydian'
    }
]


export default function ModeBox ({setOption}){

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currMode, setMode] = React.useState(''); // lists options of modes
	const[modeState, modeSwitch] = React.useState(false); // enables option for mode
    
	const handleOption = (event, val) => {
		let temp = marks[val].mode;
		setMode(temp);
	};

    const handleCheck = () => {
        modeSwitch(!modeState);

		if (!modeState)
			setMode('');
		
		setOption(modeState);
    }

	return(
		<div>
			<Card className={cardClasses.root}>
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
                	labelPlacement="start"
            	/>

				{modeState &&
					<section className={boxClasses.sectionBox}>
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
							defaultValue={3}
							min={0}
							max={6}
							aria-labelledby="discrete-slider-restrict"
							step={null}
							marks={marks}
							track='false'
							onChange={handleOption}
						/>
					</ section>
				}
			</Card>
		</div>
	)
}

