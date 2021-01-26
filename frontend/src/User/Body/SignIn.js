import React from 'react';
import {Modal, Container, Button, Tabs, Tab, Form, Alert} from 'react-bootstrap';
import RedirectToHome from './RedirectToHome';
import { Redirect } from 'react-router-dom';
import { useDataContext } from './../../App';
import axios from 'axios';
import { rooturl } from '../../config/config';
import jwt_decode from 'jwt-decode';

function SignIn(props) {

  const [show, setShow] = React.useState(true);
  const [userLoginError, showUserLoginError] = React.useState('');
  const [userRegisterError, showUserRegisterError] = React.useState('');
  const {data,setData} = useDataContext();
  const [closeModal,setCloseModal] = React.useState(null);

  const handleClose = (e) => {
    setCloseModal(<Redirect to={`/home`} />);
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      last_name: form.lastName.value,
      first_name: form.firstName.value,
      email_id: form.email.value,
      password: form.password.value,
      user_type: form.user_type.value.length ? form.user_type.value : 'default',
    };
    axios.post(`${rooturl}/core/user/register`, formData,{ validateStatus: false })
    .then((response) => {
      if (response.status === 201) {
        form.reset();
        showUserRegisterError(<Alert variant="success">Registration Successful. Please login once your account is verified</Alert>);
      }else{
        let errors = Object.values(response.data || {'error' : ['Something went wrong']});
        showUserRegisterError(errors.map(error => {
          return <Alert variant="danger">{error}</Alert>
        }));
      }
    });
  }

  const handleUserSigninSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      email_id: form.email.value,
      password: form.password.value,
    };
    axios.post(`${rooturl}/core/user/login`, formData,{ validateStatus: false })
    .then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
          let decodedUserInfo = JSON.stringify(jwt_decode(response.data.token));
          localStorage.setItem('token', response.data.token);
          localStorage.setItem("userType", response.data.user_details.user_type);
          localStorage.setItem("email", formData.email);
          setShow(false);
          setData({...data,logggedIn: true});
      }else{
        let errors = Object.values(response.data || {'error' : ['Something went wrong']});
        showUserLoginError(errors.map(error => {
          return <Alert variant="danger">{error}</Alert>
        }));
      }
    });
  }

  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
      <RedirectToHome />
      {closeModal}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Home Finder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
      <Tabs defaultActiveKey="signin">
        <Tab eventKey="signin" title="Sign In">
          <Container>
            <br />
            <Form onSubmit={handleUserSigninSubmit}>
              {userLoginError}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign In
              </Button>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Container>
            <br />
            <Form onSubmit={handleRegisterSubmit}>
              {userRegisterError}            
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='firstName' placeholder="First Name" required/>
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lastName' placeholder="Last Name" required/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
                <Form.Text className="text-muted">
                  At least 8 characters
                </Form.Text>
                <Form.Text className="text-muted">
                  Mix of letters and numbers
                </Form.Text>
              </Form.Group>
              <Form.Group>
              <Form.Check inline type="radio" name="user_type" value="realtor" aria-label="radio 1" label="Realtor" />
              <Form.Check type="radio" inline name="user_type" value="landlord" aria-label="radio 1" label="Landlord" />
              <Form.Check type="radio" inline name="user_type" value="seller" aria-label="radio 1" label="Seller" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>
          </Container>
        </Tab>
      </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default SignIn;