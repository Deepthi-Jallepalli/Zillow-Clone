import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDataContext } from './../../App';

const SignOut = () => {
  const {data,setData} = useDataContext();
  localStorage.removeItem('email');
  localStorage.removeItem('userType');
  localStorage.removeItem('token');
  setData({...data,logggedIn: false});
  return <Redirect to={`/home`} />;
};

export default SignOut;