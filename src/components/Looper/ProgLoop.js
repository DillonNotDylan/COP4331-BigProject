import React from 'react'
import {
	CardHeader,
	Card,
	CardContent,
	IconButton,
	Grid,
	ButtonGroup,
	Dialog,
    DialogActions,
    Button,
    Typography

} from '@material-ui/core'
import DeleteOutlined from '@material-ui/icons/DeleteOutline'
import AddIcon from '@material-ui/icons/Add';
import Chordbox from './Chordbox'

const ProgLoop = ({loopData, id, deleteLoop}) => {
	// const [title, setTitle] = useState("")
    const [modalDisplayed, setDisplay] = React.useState(false);
	const showModal = () => {
        setDisplay(!modalDisplayed);
    }

    const closeModal = () => {
        setDisplay(false);
    }

    const deleteClarify = (
        <div style={{padding: 20, justifyContent: "center"}}>
            <Typography variant="h6">
                Are you sure you want to delete this loop?
            </Typography>
            <p>
                <Button style={{marginLeft: 70, marginRight: 100}} variant="contained" onClick={() => deleteLoop(id)}>
                    Yes
                </Button>
                <Button variant="contained" onClick={closeModal}>
                    No
                </Button>
            </p>
            

        </div>
    );

	return (
		<div>
			<Card>
				<Card>
					<CardHeader
						action={
							<ButtonGroup>
								<IconButton
                                    onClick={showModal}
                                >
                                    <DeleteOutlined/>

                                    <Dialog
                                        open={modalDisplayed}
                                        onClose={closeModal}
                                    >
                                        <DialogActions>
                                            {deleteClarify}
                                        </DialogActions>
                                    </Dialog>
                                </IconButton>


							</ButtonGroup>
						}
						
						subheader={loopData.name}
						
					/>

					<CardContent>
						<Grid container style={{justifyContent: 'center'}}>
							{
								
								loopData.chords.map((singleChord, position) =>
									{
										return (
											<Grid item style={{width: 100}}>
												<Chordbox 
													chord={singleChord}
													position={position}
													loop={loopData}
												/>
											</Grid>
										)
									}
								)
							}
						</Grid>
					</CardContent>
				</Card>

			</Card>
		</div>
	)
}



export default ProgLoop
