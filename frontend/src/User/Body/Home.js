import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Home.css';
import RedirectToSignin from './RedirectToSignin';

function Home(props) {
  let [redirect,setRedirect] = React.useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    setRedirect(<Redirect to={`/rent?query=${e.target.search.value}`}></Redirect>)
  }
  return (
    <div className = 'home'>
      {/* <RedirectToSignin/> */}
      <div className = 'header'>
        <h2 className = "description">Reimagine home!</h2>
        <h2 className = "description">We’ll help you find a place you’ll love.</h2>
        {redirect}
        <Form className = "search-bar" onSubmit={e => handleSubmit(e)}>
          <input className='pa3 w-90 ba center' type='search' autoComplete='off' required name='search' placeholder='Enter an address, city or ZIP code'/>
          <Button className="search-button" variant='primary' type='submit'>Search</Button>
        </Form>
      </div>
    </div>
  );
}

export default Home;
