import React, { useState } from 'react'
import {
    makeStyles
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
    const [status, switchStatus] = React.useState(false);

    return(
        <div style={{width: '100%'}}>  
            <br />
            <KeyBox currOption={!currOption} grabKey={grabKey} grabMode={grabMode} status={status} switchStatus={switchStatus}/>
            {/* <ModeBox setOption={setOption} grabMode={grabMode} status={status} switchStatus={switchStatus}/> */}
            <br />
        </div>
    )
}

export default ToolPage
