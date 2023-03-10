import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./AddFund.css";
import ReactJsAlert from "reactjs-alert";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../UserContext';

const AddFund = () => {
	const  user  = useContext(UserContext);
	console.log(user);
    const [Advertisers , setAdvertisers] = useState('');
	const [ModeofPayment , setModeofPayment] = useState('');
	const [Amount , setAmount] = useState('');
	const [Description , setDescription] = useState('');
	const [Comment , setComment] = useState('');
	const [alertStatus, setAlertStatus] = useState(false);
  	const [alertType, setAlertType] = useState("");
  	const [alertMessage, setAlertMessage] = useState("");
	const [advertiserData, setAdvertiserData] = useState([]);  
	console.log(user);

	const getAdvertiserData = async () => {
		const { data } = await axios.get(`api/getAdvertiserData`);
		setAdvertiserData(data);
	  };

	useEffect(()=>{
		getAdvertiserData();
	},[]);
	console.log(advertiserData);
	const handleSubmit=(e)=>{
    alert('A form was submitted with Advertisers :"' + Advertisers +
      '" ,ModeofPayment :"'+ModeofPayment +'" and Amount :"' + Amount + '"');

	var udata = {
		Advertisers,
		ModeofPayment,
        Amount,
		Description,
		Comment
	};
	const config = { headers: { "Content-Type": "application/json" } };

    const  data  = axios.post(`/api/addFund`, udata, config);
        data.then((result) =>{
            console.log(result);
            if(result.status === 200){
				setAlertStatus(true);
				setAlertType("success");
				setAlertMessage("Fund Added Successfully");
				alert("Fund Added");
            }
        }).catch((err) => {
			console.log(err.response.data.message);
			setAlertStatus(true);
			setAlertType("error");
			setAlertMessage(err.response.data.message);
		})
        e.preventDefault();
	}
  return (
	  <>
    <Container className="small-container">
		<Form onSubmit={(e) => {handleSubmit(e)}}>
			<h4 className="my-3">Add Fund</h4>
			<Form.Group className="mb-3" controlId="Advertisers">
			<Form.Label>Advertisers</Form.Label>
			<Form.Select onChange={(e)=> {setAdvertisers(e.target.value)}}>
			<option>Open this select menu</option>
			{advertiserData && advertiserData.map(key => (
				<option key={key.advertiserName}>{key.advertiserName}</option>
				
			))}
			</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="ModeofPayment">
			<Form.Label>Mode of Payment</Form.Label>
			<Form.Control size="sm" type="text" value={ModeofPayment} required onChange={(e)	=> {setModeofPayment(e.target.value)}} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="Amount">
			<Form.Label>Amount</Form.Label>
			<Form.Control size="sm" type="number" value={Amount} required onChange={(e) => {setAmount(e.target.value)}} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="Description">
			<Form.Label>Description</Form.Label>
			<Form.Control size="sm" type="text" value={Description} required onChange={(e)=> {setDescription(e.target.value)}} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="Comment">
			<Form.Label>Comment</Form.Label>
			<Form.Control size="sm" type="text" value={Comment} required onChange={(e)=> {setComment(e.target.value)}} />
			</Form.Group>

			<div className="mb-3">
          		<Button type="submit">Add Fund</Button>
        	</div>
		</Form>
		<ReactJsAlert
					status={alertStatus}   // true or false
					type={alertType}   // success, warning, error, info
					title={alertMessage}   // title you want to display
					Close={() => setAlertStatus(false)}   // callback method for hide
				/>
	</Container>
	</>
  );
};

export default AddFund;
