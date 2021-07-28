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
import { dillonToDisplay } from '../Script/Convert';

// Convert the formatted chord from Dillon's function into a more user friendly appearance
// A_sharp_min_7 ==> A#min7

// Position refers to this chord's place in the array, 0 indexed
const Chordbox = ({chord, position, loop, setEdit}) => {
	return (
		<div>
			<CardActionArea onClick={() => {
				// console.log(chord + " " + position)
				console.log("Position: " + (position))

				setEdit !== null && setEdit(position)
			}}>
			{/* <CustomModal /> */}
			
			
				<Card>
					<CardHeader title={dillonToDisplay(chord)} />	

				</Card>
				
			</CardActionArea>
			

		</div>
		
	)
}

export default Chordbox


