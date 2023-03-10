import React, { useContext, useEffect, useState }  from 'react';
import axios from 'axios';
import "./Register.css";
import ReactJsAlert from "reactjs-alert";
import { UserContext } from '../../UserContext';

const Logout = ({ history, location }) => {
    const { setUser } = useContext(UserContext);
    const [alertStatus, setAlertStatus] = useState(false);
  	const [alertType, setAlertType] = useState("");
  	const [alertMessage, setAlertMessage] = useState("");
    useEffect(()=>{
        setUser(null);
        axios.get(`/api/logout`);
        //setUser(null);
        setAlertStatus(true);
				setAlertType("success");
				setAlertMessage("Logout Successfully");
				setTimeout(()=>{
					history.push("/");
				},2000)
    },[])
    return (
        <ReactJsAlert
					status={alertStatus}   // true or false
					type={alertType}   // success, warning, error, info
					title={alertMessage}   // title you want to display
					Close={() => setAlertStatus(false)}   // callback method for hide
				/>
    );
};
export default Logout;