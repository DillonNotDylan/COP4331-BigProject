import React from 'react'
import {
	Card,
	CardContent,
    makeStyles,
    Grid
} from '@material-ui/core'

import KeyBox from './KeyBox'
import ModeBox from './ModeBox'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'center',
        flexWrap: 'wrap',
        '& >': {
            margin: theme.spacing(1),
            width: theme.spacing(250),
        },

    },
}));


const ToolPage = () => {
    const classes = useStyles();
   
    return(
        <div>  
            <br />
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs sm={3}>
                            <KeyBox />
                        </Grid> 
                        <Grid item xs>
                            <ModeBox />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <br />
        </div>
    )
}

export default ToolPage
