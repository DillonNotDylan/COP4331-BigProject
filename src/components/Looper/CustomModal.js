import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, IconButton, Modal} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ChordSelector from './ChordSelector';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 500,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function CustomModal(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	return (
		<div>
			<IconButton
				onClick={handleOpen}
			>
				<EditOutlined />
			</IconButton>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<ChordSelector loopData={props.loopData}/>
				</Modal>
			</div>
		</div>
	);
}
