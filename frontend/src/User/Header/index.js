import React from 'react';
import RedirectToSignin from '../Body/RedirectToSignin';
import Menu from './Menu';

function Header(props) {
  return (
    <>
      {/* <RedirectToSignin/> */}
      <Menu userInfo={null} />
    </>
  );
}

export default Header;
