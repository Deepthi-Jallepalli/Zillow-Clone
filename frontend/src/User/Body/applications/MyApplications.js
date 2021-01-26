import Axios from 'axios';
import React from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { rooturl } from '../../../config/config';

import MyApplication from './MyApplication';

function MyApplications(props) {
  let [applications, setApplications] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  function toggleModal() {
      setIsOpen(!isOpen);
  }
  React.useEffect(()=>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get(`${rooturl}/applications/user`).then(response =>{
      if (response.status === 200) {
        setApplications(response.data);
      }
    })
  },[]);
  return (
    <Container>
      <h4>My Applications</h4>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Property</th>
            <th>Application Status</th>
            <th>Edit/Withdraw</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(application => {
            return <MyApplication application={application}/>
          })}
        </tbody>
      </Table>
    </Container>
    
  );
}

export default MyApplications;