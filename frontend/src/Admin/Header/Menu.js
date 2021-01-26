import React from 'react';
import {Navbar,Nav,Container,Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../Home-Finder.png'
import './Menu.css';

function Menu(props) {
  return (
  <Container className='menu-container'>
    <Row>
      <Col>
      </Col>
      <Col xs={6}>
      <Navbar.Brand href='/home'><img className = 'logo' src = {logo} alt ="Home Finder" ></img></Navbar.Brand>
      </Col>
      <Col>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            {localStorage.getItem('email') ? (
              <Nav.Link><Link to='/sign-out'>Sign out</Link></Nav.Link>
            ) : (
              <Nav.Link><Link to='/sign-in'>Sign in</Link></Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  </Container>  
  );
}

export default Menu;