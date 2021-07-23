import React from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	ButtonGroup,
	IconButton,
	CardActionArea,	
} from '@material-ui/core'
import getAllSuggestions from '../Script/Suggest'
// import test from '../Script/Suggest'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutline'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomModal from './CustomModal'

// const useStyles = makeStyles({
// 	root: {
// 		background: 'linear-gradient()',
		
// 	}
// })

const Chordbox = ({chord, position, loop, setEdit}) => {
	return (
		<div>
			<CardActionArea onClick={() => {
				// console.log(chord + " " + position)
				console.log("Position: " + (position+1))

				setEdit !== null && setEdit(position+1)
				
				// console.log("THIRD")
				// getAllSuggestions("A_min", "C_maj", "B_maj", "F_maj", 3, "C", 1)
				// console.log("SECOND")
				// getAllSuggestions("A_min", "C_maj", "B_maj", "F_maj", 2, "C", 1)
				// console.log("FIRST");
				// getAllSuggestions("A_min", "C_maj", "B_maj", "F_maj", 1, "C", 1)
			}}>
			{/* <CustomModal /> */}
			
			
				<Card>
					<CardHeader title={chord} />	

				</Card>
				
			</CardActionArea>
			

		</div>
		
	)
}

export default Chordbox


