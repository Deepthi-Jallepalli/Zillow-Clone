import React from 'react';
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';
import logo from '../../Home-Finder.png'
import {FaUser, FaSignOutAlt} from 'react-icons/fa';

function Menu(props) {
  return (
  <Container className='menu-container'>
    <Navbar>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link><Link className="navigation-links" to='/buy'>Buy</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link className="navigation-links" to='/rent'>Rent</Link></Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Brand><Link className="navigation-links" to='/home'><img className = 'logo' src = {logo} alt ="Home Finder"/></Link></Navbar.Brand>

        <Nav className="ml-auto" activeKey="/home">
        {localStorage.getItem('email') && localStorage.getItem('userType') !== 'default' ? (
          <Nav.Item> 
            <NavDropdown title="Manage Listings" id="basic-nav-dropdown">
              <NavDropdown.Item><Link className="navigation-links" to='/view-listings'> View Listings</Link></NavDropdown.Item>
              <NavDropdown.Item><Link className="navigation-links" to='/create-listings'> Create Listings</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
          ) : (
            <Nav.Item> 
            </Nav.Item>
          )}
          {localStorage.getItem('email') ? (
              <Nav.Item> 
                <NavDropdown title={<FaUser/>} id="basic-nav-dropdown">
                  <NavDropdown.Item><Link className="navigation-links" to='/my-profile'>My Profile</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link className="navigation-links" to='/favourite-searches'>Favorite Searches</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link className="navigation-links" to='/favourite-homes'>Favorite Homes</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link className="navigation-links" to='/my-applications'> Applications(Buy/Sell)</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item ><Link className="navigation-links" to='/sign-out'>Sign out &nbsp;</Link><FaSignOutAlt/></NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link href='/sign-in'>Sign in &nbsp;</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
    </Navbar>
  </Container>  
  );
}

export default Menu;