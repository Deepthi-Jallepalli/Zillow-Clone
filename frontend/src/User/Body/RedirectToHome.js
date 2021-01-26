import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToHome = () => {
  const email = localStorage.getItem('email');
  if (email) {
    return <Redirect to={`/home`} />;
  }
  return null;
};

export default RedirectToHome;