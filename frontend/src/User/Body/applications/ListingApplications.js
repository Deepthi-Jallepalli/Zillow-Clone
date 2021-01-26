import Axios from 'axios';
import React from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { rooturl } from '../../../config/config';
import './ListingApplications.css';

function ListingApplications(props) {
  let [applications, setApplications] = React.useState([]);
  let [reload,setReload] = React.useState(false);
  let handleClick = (value,id) =>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    let formData = {
      "id": id,
      "status": value,
    };
    Axios.put(`${rooturl}/applications/status/update`,formData, {validateStatus: false})
    .then(response => {
      if(response.status === 201){
        setReload(!reload);
      }
    });
  }
  
  React.useEffect(()=>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get(`${rooturl}/applications/?listing_id=${props.match.params.id}`).then(response =>{
      if (response.status === 200) {
        setApplications(response.data);
      }
    })
  },[reload]);
  return (
    <Container id='lisiting-appications'>
      <h4>Applications</h4>
      <br/>
      {applications.map(application => {
            return <><Card>
              <Card.Body>
                <Row>
                  <Col><b>Name : </b>{application.user}</Col>
                  <Col><b>Gender :</b> {application.user_info.sex}</Col>
                  <Col><b>Date of Birth :</b> {application.user_info.date_of_birth}</Col>
                </Row>
                <br/>
                <Row>
                  <Col><b>Credit Score :</b> {application.user_info.credit_score}</Col>
                  <Col><b>Employment Type :</b> {application.user_info.employment_type}</Col>
                  <Col><b>Annual Salary :</b> {application.user_info.annual_salary}</Col>
                </Row>
                {application.offered_price.length && <><br/>
                <Row>
                  <Col><b>Offer Price : </b>{application.offered_price}</Col>
                </Row></>}
                <br/>
                <Row>
                  <Col style={{"text-align":"center"}}>
                    {application.status === 'pending' ? <>
                      <Button variant='success' onClick={e => handleClick('accepted',application.id)}>Accept</Button>{' '}
                      <Button variant='danger' onClick={e => handleClick('rejected',application.id)}>Reject</Button></> :
                      <div><b>Application Status : </b>{application.status}</div>
                    } 
                  </Col>
                </Row>
              </Card.Body>
            </Card><br/></>
          })}
    </Container>
    
  );
}

export default ListingApplications;