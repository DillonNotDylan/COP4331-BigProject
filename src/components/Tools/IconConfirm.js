import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutline';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirm({ title, diagText, thenFunc }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton
				onClick={handleClickOpen}
			>
				<DeleteOutlined />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{diagText}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => {thenFunc(); handleClose()}} color="secondary" autoFocus>
						Confirm
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
