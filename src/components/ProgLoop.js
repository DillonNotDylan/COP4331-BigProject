import React from 'react'
import {
	CardHeader,
	Card,
	CardContent,
	IconButton

} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'

const ProgLoop = (props) => {
	return (
		<div>
		<Card>
			<Card>
				<CardHeader
					action={
						<IconButton>
							<DeleteOutlined />
						</IconButton>
					}
					title="#1: Loop Name"	
				/>
			</Card>

		</Card>
		</div>
	)
}



export default ProgLoop
