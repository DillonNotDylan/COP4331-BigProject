# Chordeographer Server

## Environments Variables
- CONNECTION_URL
	- MongoDB cluster connection string.
- PORT
	- Localhost port for server.
- SESSION_LIMIT
	- Number of hours a user can be logged in before having to sign in again.
- BASE_URL
	- Main website's URL. Used for emai verifcations and password resets.
- JWT_SECRET
	- Random string used to sign and verify JSON Web Tokens.
- EMAIL
	 - Chordeographer email. Used for email automation for email verifcations and password resets.
- CLIENT_ID
	- Used for Google API authentication to automate emails.
- CLIENT_SECRET
	- Used for Google API authentication to automate emails.
- REDIRECT_URI
	- Used for Google API authentication to automate emails.
- REFRESH_TOKEN
	- Used for Google API authentication to automate emails.

## MongoDB Collections

- Users
	- Fields:
		- email 
			- type: String
			- required: true
		- password
			- type: String
			- required: true
		- nickname (String)
			- type: String
			- required: true
		- isVerified
			- type: Boolean
			- defualt: false
		- projects
			- type: [ObjectId]
			- defualt: []
		- lastLogin (Date)
			- type: Date
			- defualt: Date.now()
		- signUpDate (Date)
			- type: Date
			- defualt: Date.now()
- Projects
	- Fields
		- title
			- type: String
			- required: true
		- key
			- type: String
			- default: ""
		- mode
			- type: String
			- default: ""
		- bpm
			- type: Number
			- default: 60
		- loops
			- type: [Object]
				- name
					- type: String
				- placement
					- type: Number
				- iteration
					- type: Number
				- progression
					- type: [Object]
						- chord
							- type: String
						- chordLength
							- type: Number

- Sessions
	- ip
		- type: String
		- required: true
	- authToken
		- type: String
		- required: true
	- loginTime
		- type: Date
		- default: Date.now()

## Server Endpoints

- http://localhost:PORT/user/signup
	- POST Request
	- Input JSON fields: 
		- email
		- password
		- nickname
	- Output JSON fields:
		- message
- http://localhost:PORT/user/signin
	- POST Request
	- Input JSON fields:
		- email
		- password
		- ip (IP address of user.)
	- Output JSON fields: 
		- authToken (Authentication token. Should be kept in a cookie to keep user signed in.)
- http://localhost:PORT/user/signout
	- POST Request
	- Input JSON fields:
		- authToken
	- Output JSON fields:
		- message
- http://localhost:PORT/user/verify-email
	- POST Request
	- Input JSON fields:
		- verificationToken
	- Output JSON fields:
		 - message
- http://localhost:PORT/user/resend-verification-email
	- POST Request
	- Input JSON fields:
		- email
	- Output JSON fields:
		- message
- http://localhost:PORT/user/try-reset
	- POST Request
	- Input JSON fields:
		- email
	- Output JSON fields:
		- message
- http://localhost:PORT/user/reset-password
	- POST Request
	- Input JSON fields:
		- verificationToken
		- password (New password.)
	- Output JSON fields: message
- http://localhost:PORT/user/upload-project
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
		- project (Object with project fields , e.g. title, key, mode, bpm, loops.)
	- Output JSON fields:
		- pid (Project id.)
- http://localhost:PORT/user/update-project
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
		- pid
		- project (Object with the project fields you wish to update.)
	- Output JSON fields:
		- message
- http://localhost:PORT/user/delete-project
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
		- pid
	- Output JSON fields:
		- message
- http://localhost:PORT/user/search-projects
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
		- criteria (Object with project fields that you wish to search for.)
	- Output JSON fields:
		- projects (Array of objects, each representing a project.)
- http://localhost:PORT/user/get-project
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
		- pid
	- Output JSON fields:
		- project (Object with project fields , e.g. title, key, mode, bpm, loops.)
- http://localhost:PORT/user/get-projects
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
	- Output JSON fields:
		- projects (Array of objects, each representing a project.)
- http://localhost:PORT/user/get-project-titles
	- POST Request
	- Input JSON fields:
		- ip
		- authToken
	- Output JSON fields:
		- titles (Array of obejcts, each with pid and title fields.)

## Guide of Use

``` javascript
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' }); // This constant should be imported from a different file.

const doSignUp = async () => {
	try {
		const body = { email: 'real.email@hotmail.com', password: 'somepass', nickname: 'musicgenius' };
		const res = await API.post('/user/signup', body);
		// If return status is 200, the rest of this try block will execute.
		console.log(res.data.message); 
	} catch (error) {
		// If return status is not 200, code will jump to this catch block.
		consoel.log(error.response.data.message);
	}
}
```