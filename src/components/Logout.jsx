import React, {Fragment} from 'react';

const Logout=()=>{
  localStorage.clear();
  window.location.href='/';
  return <Fragment/>
};

export default Logout;