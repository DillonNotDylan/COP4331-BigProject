import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const KeySelect = (props) => {
	return (
		<div>
			<Select className={props.styling}
				value={props.currKey}
				onChange={props.handleChange}
				label="Key"
				defaultValue={props.currKey}
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

			</Select>
		</div>
	)
}

export default KeySelect
