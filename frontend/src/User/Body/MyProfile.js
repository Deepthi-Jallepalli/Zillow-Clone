import Axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { rooturl } from '../../config/config';

function MyProfile(props) {
  let [profile,setProfile] = React.useState({});

  React.useEffect(()=>{
    Axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    Axios.get(`${rooturl}/core/user/info`,{validateStatus: false}).then(response => {
      if(response.status === 200){
        setProfile(response.data.user_deatils);
      }
    })
  },[])

  return (
    <div>
      <h4>My Profile</h4>
      <Container id='my-profile'>
        <Row>
          <Col style={{'text-align':'right'}}>Sex</Col> : <Col style = {{'text-align':'left'}}>{profile.sex === 'M' ? 'Male' : 'Female'}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>Date of birth</Col> : <Col style = {{'text-align':'left'}}>{profile.date_of_birth}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>Credit Score</Col> : <Col style = {{'text-align':'left'}}>{profile.credit_score}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>Annual Salary</Col> : <Col style = {{'text-align':'left'}}>{profile.annual_salary}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>First Name</Col> : <Col style = {{'text-align':'left'}}>{profile.first_name}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>Last Name</Col> : <Col style = {{'text-align':'left'}}>{profile.last_name}</Col>
        </Row>
        <Row>
          <Col style={{'text-align':'right'}}>Email Id</Col> : <Col style = {{'text-align':'left'}}>{profile.email_id}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyProfile;