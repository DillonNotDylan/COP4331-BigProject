import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, IconButton, Modal} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ChordSelector from './ChordSelector';
import { AddOutlined, ModeComment, Title } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 600,
		height: 600,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

// id: index of the loop's place in the project's array
// loopData: info in this loop, including Title, chords, key
// pProject: the information of this entire loop, including Title, chords, key
export default function CustomModal({id, loopData, submitAction, addFlag, icon}) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		console.log(loopData)
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	return (
		<div>
			
			{
				addFlag 
					? 
						<Button
							variant="outlined"
							onClick={handleOpen}
							startIcon={<AddOutlined />}
						>
							Add Loop

						</Button>
					:
						<IconButton onClick={handleOpen}>
							<EditOutlined />
						</IconButton>
			}
			

			<div >
				<Modal
					className
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
		
					<ChordSelector 
						id={id}
						loopData={loopData} 
						submitAction= {submitAction}
						addFlag={addFlag}
						parentHandleClose={handleClose}
					/>
							
				</Modal>
			</div>
		</div>
	);
}
