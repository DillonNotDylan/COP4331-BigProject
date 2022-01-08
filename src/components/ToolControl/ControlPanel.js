import React, { useState } from 'react'
import LoopBox from '../Looper/LoopBox'
import ToolPage from '../Tools/ToolPage'

export default function ControlPanel() {

    // const [useKey, grabKey] = React.useState(1);
    // // const [useQuality, grabQuality] = React.useState();
    // const [useMode, grabMode] = React.useState(5);

    return (
        <div style={{
            borderRadius: '20px', 
            // background: '#fefefe', 
            // boxShadow: 'inset 10px 10px 10px #c8bcb2, inset 0px 0px 10px #fffef0', 
            padding: '2rem', 
            width: '90%'}}>
            {/* <ToolPage grabKey={grabKey}  grabMode={grabMode}/> */}
            <LoopBox />
        </div>
    )
}
// backgroundColor: '#fefefe', boxShadow: '5px 5px 60px #c8bcb2, -5px -5px 20px #fffef0'
 
