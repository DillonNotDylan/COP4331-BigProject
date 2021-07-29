import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const KeySelect = (props) => {
	return (
		<div>
			<Select
				value={props.useMode}
				onChange={props.handleChange}
				label="Key"
				defaultValue={props.useMode}
			>
				<MenuItem value={0}>Locrian</MenuItem>
				<MenuItem value={1}>Phrygian</MenuItem>
				<MenuItem value={2}>Aeolian</MenuItem>
				<MenuItem value={3}>Dorian</MenuItem>
				<MenuItem value={4}>Myxolydian</MenuItem>
				<MenuItem value={5}>Ionian</MenuItem>
				<MenuItem value={6}>Lydian</MenuItem>

			</Select>
		</div>
	)
}

export default KeySelect
