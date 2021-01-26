import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToSignin = () => {
  const email = localStorage.getItem('email');
  if (!email) {
    return <Redirect to={`/sign-in`} />;
  }
  return null;
};

export default RedirectToSignin;