import {
	Dialog, 
	TextField,
	Button,
	Typography
} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';


const ForgPass = (props) =>
{
	const [email, setEmail] = useState("");
	const [msg, setMsg] =  useState("");
	const [submitted, setSubmit] = useState(false);
	
	const handleSubmit = async () => {
		let res = {data: {message: ""}};

		try {
			res = await axios.post("https://chordeo-grapher.herokuapp.com/user/reset-password", { email })
			
			setSubmit(true);
			setMsg(`Password reset link sent to ${email}.`);
		}
		catch (err)
		{
			setMsg("Something went wrong.");
		}

	};

	const formChange = (e) =>
	{
		setEmail(e.target.value);
	};

	const style = {display:'flex', flexDirection:'column',
		alignText:'center', justifyContent:'center', 
		margin:'4vw', borderRadius:'20px', border:'1px',	
	};

	return (
		<Dialog open={props.toggle} onClose={props.toggle} >
			<div style={style} >
				{
					!submitted?
					<div style={style}>
						<h1 style={{width:'40vw'}} >Enter Recovery Email</h1>
						<TextField placeholder="Email" onChange={formChange} />
						<Button onClick={handleSubmit}>Try Reset</Button>
					</div>
					: null
				}
				<Typography>{msg}</Typography>
				
			</div>
		</Dialog>
	);
}

export default ForgPass;