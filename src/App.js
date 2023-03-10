import React, { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./component/User/Register";
import logout from "./component/User/Logout";
import addFund from "./component/Fund/AddFund";
import GetFundData from "./component/Fund/FundDetails";
import AddAdvertisers from "./component/Advertisers/AddAdvertisers";
import AdvertisersDetails from "./component/Advertisers/AdvertisersDetails";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { UserContext } from './UserContext';

function App() {
	const [user, setUser] = useState(null);
	const value = useMemo(()=> ({ user, setUser}),[user, setUser]);

return (
	
	<Router>
		<div className="d-flex flex-column">
		<UserContext.Provider value= {value} >
			<Header />
			<div className="container">
				<Switch>
					
						<Route exact path="/" component={Register} />
						<Route exact path="/addFund" component={addFund} />
						<Route exact path="/getFundData" component={GetFundData} />
						<Route exact path="/registerAdvertiser" component={AddAdvertisers} />
						<Route exact path="/getAdvertiserData" component={AdvertisersDetails} />
						<Route exact path="/logout" component={logout} />
					
				</Switch>
			</div>
			<Footer />
			</UserContext.Provider>
		</div>
  	</Router>
);
}

export default App;
