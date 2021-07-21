import React from 'react';
import { 
	BrowserRouter as Router, 
	Switch, 
	Route, 
	Link
} from "react-router-dom";

import './css/App.css';
import Home from './pages/Home';
import ResetPass from './pages/ResetPass';
import VerificationPage from './pages/VerificationPage';

function App() {
	return (
		<Router>
			<Link>
			
			</Link>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/reset-password" exact>
					<ResetPass />
				</Route>
				<Route path="/verify-account/:token" exact>
					<VerificationPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
