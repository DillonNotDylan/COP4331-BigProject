import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		width: '50%',
		maxWidth: 50,
		backgroundColor: theme.palette.background.paper,
	},
}));

const SuggestList = ({suggestions, selectedIndex, handleListClick}) => {
	const classes = useStyles();
	
	return (
		<div>
			
			<List subheader={<ListSubheader>Suggestions</ListSubheader>} component="nav" aria-label="secondary mailbox folder">
				{
					suggestions.map((chord, index) => {
						return (
							<ListItem
								button
								value={chord}
								selected={selectedIndex === index}
								onClick={(event) => handleListClick(event, index)}
							>
								<ListItemText primary={chord} />
							</ListItem>
						)
					})
				}
			</List>
		</div>
	)
}

export default SuggestList
