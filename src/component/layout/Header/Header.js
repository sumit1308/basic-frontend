import React, {useContext, useEffect} from "react";
//import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { UserContext } from '../../../UserContext';
const Header = () => {
  const user  = useContext(UserContext);
  console.log(user.user);
  console.log(user.user !== null);
  console.log(user.user !== "null");
  useEffect(()=>{
    console.log(user);
  },[]);
  
  return (
      <div className="">
       <Navbar bg="primary" variant="dark">
          <Container>
            <LinkContainer to="/registerAdvertiser"><Nav>Add Advertiser</Nav></LinkContainer>
            <LinkContainer to="/getAdvertiserData"><Nav>Advertiser Details</Nav></LinkContainer>
            <LinkContainer to="/addFund"><Nav>Add Fund</Nav></LinkContainer>
            <LinkContainer to="/getFundData"><Nav>Fund Details</Nav></LinkContainer>
            {(user.user !== null) ? <LinkContainer to="/logout"><Nav>Logout</Nav></LinkContainer> : <LinkContainer to="/"><Nav>SignUp</Nav></LinkContainer>}
          </Container>
        </Navbar>
        {/* <Link to="/">User Registration</Link>
        <Link to="/addFund">Add Fund</Link>
        <Link to="/getFundData">Fund Details</Link> */}
      </div>
  )
};

export default Header;
