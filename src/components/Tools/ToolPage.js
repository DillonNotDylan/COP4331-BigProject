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
        flexWrap: 'nowrap',
        '& >': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
        },

    },
}));


const ToolPage = ({grabKey, grabMode}) => {
    const classes = useStyles();
    const [currOption, setOption] = useState(true);
    const[status, switchStatus] = React.useState(false);

    return(
        <div>  
            <br />
            <Card className={classes.root}>
                <CardContent>
                    <Grid container>
                        <Grid item xs>
                            <KeyBox currOption={!currOption} grabKey={grabKey} grabMode={grabMode} status={status} switchStatus={switchStatus}/>
                        </Grid> 
                        <Grid item xs sm>
                            <ModeBox setOption={setOption} grabMode={grabMode} status={status} switchStatus={switchStatus}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <br />
        </div>
    )
}

export default ToolPage
