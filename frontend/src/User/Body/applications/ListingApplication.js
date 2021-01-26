import React from 'react';
import GridModal from '../Grids/GridModal';
import { Alert, Button, Container, Modal, Table } from 'react-bootstrap';
import Axios from 'axios';
import { rooturl } from '../../../config/config';

function ListingApplication(props) {
  let application = props.application;
  const [isOpen, setIsOpen] = React.useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  let handleWithDraw = () => {
    // make a post request with the user data
    const formData = {
      "id": application.id,
      "status": "withdraw",
      "deleted_why": "not interested"
    }
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.post(`${rooturl}/applications/withdraw`, formData,{ validateStatus: false })
    .then((response) => {
      if (response.status === 200) {
        setWithdrawButton(<Alert variant='success'>Application withdrawn!</Alert>);
      }else{
        setWithdrawButton(<Alert variant='danger'>Something went wrong!</Alert>);
      }
    });
  }
  const [withdrawButton,setWithdrawButton] = React.useState(application.status !== 'withdraw' ? (<Button onClick={handleWithDraw} variant="danger">Withdraw</Button>) : (''));
  return (
    <>
    <tr>
      <td><Button onClick={toggleModal} variant="primary">View Details</Button>
      </td>
      <td>{application.status}</td>
      <td>{withdrawButton}</td>
    </tr>
    <Modal show={isOpen} onHide={toggleModal} size="lg">
      <GridModal home_id = {application.home_listing}/>
      <br/>
      <Button variant="danger" onClick={toggleModal}>Close</Button>
    </Modal>
  </>
  );
}

export default ListingApplication;