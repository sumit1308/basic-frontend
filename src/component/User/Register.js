import React, {useContext, useState} from 'react';
import axios from 'axios';
import "./Register.css";
import ReactJsAlert from "reactjs-alert";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../UserContext';


const Register = ({ history, location }) => {
	const { setUser } = useContext(UserContext);
    const [name , setName] = useState('');
	const [age , setAge] = useState('');
	const [email , setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [confPassword , setConfPassword] = useState('');
	const [alertStatus, setAlertStatus] = useState(false);
  	const [alertType, setAlertType] = useState("");
  	const [alertMessage, setAlertMessage] = useState("");
	// useEffect(()=>{
		

	// },[]);
	// const loadUser = () => {
	// 	const  data  = axios.get(`/api/v1/getUser`);
	// 	console.log(data);
	// 	data.then((result) =>{
	// 		console.log(result);
	// 	})
	// 	axios.get('https://jsonplaceholder.typicode.com/todos/2')
	// 	.then(function (response) {
	// 		// handle success
	// 		console.log(response.data);
	// 	})
	// 	.catch(function (error) {
	// 		// handle error
	// 		console.log(error);
	// 	})
	// }
	// loadUser();
	const handleSubmit=(e)=>{
		
    if(password !== confPassword)
    {
      alert("password Not Match");
    }
    else{
      alert('A form was submitted with Name :"' + name +
      '" ,Age :"'+age +'" and Email :"' + email + '"');
    }
	var udata = {
		name,
		email,
        age,
		password
	};
	const config = { headers: { "Content-Type": "application/json" } };

    const  data  = axios.post(`/api/register`, udata, config);
        data.then((result) =>{
            console.log(result);
            if(result.status === 201){
				setUser(result.data.user);
				setAlertStatus(true);
				setAlertType("success");
				setAlertMessage("User register Successfully");
				setTimeout(()=>{
					history.push("/getAdvertiserData");
				},2000)
				
                //alert("User register Successfully");

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
    <Container className="small-container">
		<Form onSubmit={(e) => {handleSubmit(e)}}>
		<h4 className="my-3">Sign Up</h4>
		<Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control size="sm" type="text" value={name} onChange={(e)=> {setName(e.target.value)}} required />
        </Form.Group>

		<Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control size="sm" type="text" value={age} required onChange={(e)	=> {setAge(e.target.value)}} />
        </Form.Group>
		
		<Form.Group className="mb-3" controlId="email">
			<Form.Label>Email address</Form.Label>
			<Form.Control size="sm" value={email} required onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter email" />
		</Form.Group>

		<Form.Group className="mb-3" controlId="password">
			<Form.Label>Password</Form.Label>
			<Form.Control size="sm" type="password" value={password} required onChange={(e)=> {setPassword(e.target.value)}} />
		</Form.Group>

		<Form.Group className="mb-3" controlId="confPassword">
			<Form.Label>Confirm Password</Form.Label>
			<Form.Control size="sm" type="password" value={confPassword} required onChange={(e)=> {setConfPassword(e.target.value)}} />
		</Form.Group>
		<div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
	</Form>
	<ReactJsAlert
					status={alertStatus}   // true or false
					type={alertType}   // success, warning, error, info
					title={alertMessage}   // title you want to display
					Close={() => setAlertStatus(false)}   // callback method for hide
				/>
	</Container>
	
	
	
	
  );
};

export default Register;
