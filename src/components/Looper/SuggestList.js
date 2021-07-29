import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core';
import { dillonToDisplay } from '../Script/Convert';

const useStyles = makeStyles((theme) => ({
	root: {
		float: 'left',
		maxWidth: "50%",
		backgroundColor: theme.palette.background.paper,
	},
}));

const SuggestList = ({suggestions, selectedIndex, handleListClick}) => {
	const classes = useStyles();
	

	return (
		<div>
			<Paper>			
				<List subheader={<ListSubheader>Suggestions</ListSubheader>} component="nav" aria-label="secondary mailbox folder">
					<Paper style={{ maxHeight: 150, overflow: 'auto' }}>
						{
							suggestions.map((chord, index) => {
								return (
									<ListItem
										button
										// style={{width: "fit-content"}}
										value={chord}
										selected={selectedIndex === index}
										onClick={(event) => handleListClick(event, index)}
									>
										<ListItemText primary={dillonToDisplay(chord)} />
									</ListItem>
								)
							})
						}
					
					</Paper>
				</List>
			
			</Paper>
		</div>
	)
}

export default SuggestList
