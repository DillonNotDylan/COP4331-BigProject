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
				<MenuItem value={0}>Ionian</MenuItem>
				<MenuItem value={1}>Dorian</MenuItem>
				<MenuItem value={2}>Phrygian</MenuItem>
				<MenuItem value={3}>Lydian</MenuItem>
				<MenuItem value={4}>Myxolydian</MenuItem>
				<MenuItem value={5}>Aeolian</MenuItem>
				<MenuItem value={6}>Locrian</MenuItem>

			</Select>
		</div>
	)
}

export default KeySelect
