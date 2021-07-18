import React, { useState } from 'react'
import LoopBox from '../Looper/LoopBox'
import ToolPage from '../Tools/ToolPage'

export default function ControlPanel() {

	const [useMode, grabMode] = useState(5)
	const [useKey, grabKey] = useState('C')

    return (

        <div>
            <ToolPage useMode={useMode} grabMode={grabMode} useKey={useKey} grabKey={grabKey}/>
            <LoopBox useMode={useMode} useKey={useKey}/>
        </div>
    )
}

 
