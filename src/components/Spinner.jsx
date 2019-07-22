import React from 'react';

const Spinner=()=>(
  <div
  style={{
    width:'100%',
    height:'100%',
    display:'flex'
  }}
  >
    <img
      src='https://loading.io/spinners/disqus/index.discuss-messesage-preloader.gif'
      alt='spinner'
      style={{
        margin:'auto',
        transform:'translateY(70%)'
      }}
    />
  </div>
  
);

export default Spinner;