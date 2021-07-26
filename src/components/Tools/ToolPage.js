import React, { useState } from 'react'
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
    const [currOption, setOption] = useState(true);
   
    return(
        <div>  
            <br />
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs sm={3}>
                            <KeyBox currOption={!currOption}/>
                        </Grid> 
                        <Grid item xs>
                            <ModeBox setOption={setOption}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <br />
        </div>
    )
}

export default ToolPage
