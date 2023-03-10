import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./AddAdvertisers.css";
import ReactJsAlert from "reactjs-alert";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../../UserContext';

const AddAdvertisers = () => {
	const { user } = useContext(UserContext);
    const [advertiserName , setAdvertiserName] = useState('');
	const [companyName , setCompanyName] = useState('');
	const [website , setWebsite] = useState('');
	const [email , setEmail] = useState('');
	const [phoneNumber , setPhoneNumber] = useState('');
	const [address , setAddress] = useState('');
	const [state , setState] = useState('');
	const [zipCode , setZipCode] = useState('');
	const [country , setCountry] = useState('');
	const [im , setIm] = useState('');
	const [alertStatus, setAlertStatus] = useState(false);
  	const [alertType, setAlertType] = useState("");
  	const [alertMessage, setAlertMessage] = useState("");
	const [advertiserData, setAdvertiserData] = useState([]);  
	const [image, setImage] = useState({ preview: '', data: '' })
	//console.log(user);

	const getAdvertiserData = async () => {
		const { data } = await axios.get(`api/getAdvertiserData`);
		setAdvertiserData(data);
	  };

	useEffect(()=>{
		getAdvertiserData();
	},[]);
	//console.log(advertiserData);
	const handleSubmit=(e)=>{
    // alert('A form was submitted with Advertisers :"' + advertiserName +
    //   '" ,ModeofPayment :"'+companyName +'" and Amount :"' + website + '"');

	// var udata = {
	// 	Advertisers,
	// 	ModeofPayment,
    //     Amount,
	// 	Description,
	// 	Comment
	// };
	let formData = new FormData();
	formData.append("advertiserName", advertiserName);
	formData.append("companyName", companyName);
	formData.append("website", website);
	formData.append("email", email);
	formData.append("phoneNumber", phoneNumber);
	formData.append("address", address);
	formData.append("state", state);
	formData.append("zipCode", zipCode);
	formData.append("country", country);
	formData.append("im", im);
    formData.append('file', image.data);
	

	//const config = { headers: { "Content-Type": "application/json" } };

    const  data  = axios.post(`/api/registerAdvertiser`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        data.then((result) =>{
            console.log(result);
            if(result.status === 200){
				setAlertStatus(true);
				setAlertType("success");
				setAlertMessage("Advertiser Added Successfully");
				//alert("Fund Added");
            }
        }).catch((err) => {
			console.log(err.response.data.message);
			setAlertStatus(true);
			setAlertType("error");
			setAlertMessage(err.response.data.message);
		})
        e.preventDefault();
	}

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  return (
	  <>
     <Container className="small-container">
		<Form onSubmit={(e) => {handleSubmit(e)}}>
			<h4 className="my-3">Add Advertiser</h4>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="advertiserName">
					<Form.Label>Advertiser Name</Form.Label>
					<Form.Control  size="sm" type="text" value={advertiserName} required onChange={(e)	=> {setAdvertiserName(e.target.value)}} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="companyName">
					<Form.Label>Company Name</Form.Label>
					<Form.Control  size="sm" type="text" value={companyName} required onChange={(e)	=> {setCompanyName(e.target.value)}} />
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="website">
					<Form.Label>Website</Form.Label>
					<Form.Control  size="sm" type="text" value={website} required onChange={(e) => {setWebsite(e.target.value)}} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="email">
					<Form.Label>E-mail</Form.Label>
					<Form.Control  size="sm" type="text" value={email} required onChange={(e)=> {setEmail(e.target.value)}} />
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="phoneNumber">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control  size="sm" type="text" value={phoneNumber} required onChange={(e)=> {setPhoneNumber(e.target.value)}} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control  size="sm" type="text" value={address} required onChange={(e)=> {setAddress(e.target.value)}} />
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="state">
					<Form.Label>State</Form.Label>
					<Form.Control type="text" value={state} required onChange={(e)=> {setState(e.target.value)}} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="zipCode">
					<Form.Label>Zip Code</Form.Label>
					<Form.Control  size="sm" type="text" value={zipCode} required onChange={(e)=> {setZipCode(e.target.value)}} />
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control  size="sm" type="text" value={country} required onChange={(e)=> {setCountry(e.target.value)}} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="im">
					<Form.Label>IM</Form.Label>
					<Form.Control  size="sm" type="text" value={im} required onChange={(e)=> {setIm(e.target.value)}} />
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Form.Group className="mb-3" controlId="Comment">
				<Form.Label>Image</Form.Label>
				{image.preview && <img alt="" src={image.preview} width='100' height='100' />}
				<Form.Control  size="sm" type='file' name='file' onChange={handleFileChange} />
				</Form.Group>
			</Row>

			{/* <div className='App'> */}
			{/* <form onSubmit={handleSubmit}>
				<input type='file' name='file' onChange={handleFileChange}></input>
				<button type='submit'>Submit</button>
			</form>
			{status && <h4>{status}</h4>}
			</div> */}
			<div className="mb-3">
          		<Button type="submit">Add Advertiser</Button>
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

export default AddAdvertisers;
