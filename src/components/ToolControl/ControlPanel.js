import React, { useState } from 'react'
import LoopBox from '../Looper/LoopBox'
import ToolPage from '../Tools/ToolPage'

export default function ControlPanel() {

    // const [useKey, grabKey] = React.useState(1);
    // // const [useQuality, grabQuality] = React.useState();
    // const [useMode, grabMode] = React.useState(5);

    return (
        <div>
            {/* <ToolPage grabKey={grabKey}  grabMode={grabMode}/> */}
            <LoopBox />
        </div>
    )
}

 
