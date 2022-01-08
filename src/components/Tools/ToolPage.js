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
            <Card className={classes.root} style={{ borderRadius: '20px', backgroundColor: '#fefefe', boxShadow: '5px 5px 60px #c8bcb2, -5px -5px 20px #fffef0'}}>
                <CardContent style={{height: '49.8vh', background: '#f3ebe5', boxShadow: 'inset 10px 10px 10px #c8bcb2, inset 0px 0px 10px #fffef0'}}>
                    <Grid container direction="row">
                        <Grid item xs style={{width: '100%'}}>
                            <KeyBox currOption={!currOption} grabKey={grabKey} grabMode={grabMode} status={status} switchStatus={switchStatus}/>
                        </Grid> 
                        <Grid item xs sm item xs style={{width: '100%'}}>
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
