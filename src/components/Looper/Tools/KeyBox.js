import React from 'react'
import {
	Card,
	CardHeader,
	CardContent,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
	makeStyles
} from '@material-ui/core'

const boxStyles = makeStyles({
	formControl: {
		alignItems: 'flex',
		display: 'flex',
	}
});

const cardStyles = makeStyles({
	root: {
		marginRight: '90%',
    	padding: '25px',
		minWidth: '150px'
  	}
});

const KeyBox = () => {

	const boxClasses = boxStyles();
	const cardClasses = cardStyles();
	const[currKey, setKey] = React.useState('');
    
	const handleChange = (event) => {
		setKey(event.target.value);
	};

	return(
		<div>
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
		</div>
	)
}

export default KeyBox