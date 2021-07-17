import React, { useState } from 'react'
import LoopBox from '../Looper/LoopBox'
import ToolPage from '../Tools/ToolPage'

export default function ControlPanel() {

    const [useKey, grabKey] = React.useState();
    // const [useQuality, grabQuality] = React.useState();
    const [useMode, grabMode] = React.useState();

    return (
        <div>
            <ToolPage grabKey={grabKey}  grabMode={grabMode}/>
            <LoopBox useKey={useKey} useMode={useMode}/>
        </div>
    )
}

 
