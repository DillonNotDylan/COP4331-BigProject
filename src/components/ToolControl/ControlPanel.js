import React from 'react'
// Import both Loopbox and any Tools components that have
// values being controlled by the UI


export default function ControlPanel() {

	const [currColor, setColor] = useState("")

	return (
		<div>
			{/* is our UI that handles color */}
			<ComponentA currColor={currColor} setColor={setColor}/>

			{/* Handles the appearance of the web page */}
			<ComponentB currColor={currColor}/>			
		</div>
	)
}

