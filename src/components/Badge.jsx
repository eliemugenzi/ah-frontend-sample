import React from 'react';

const Badge=({info})=>{
  return(
    <div
    style={{
      width:15,
      height:15,
      borderRadius:'50%'
    }}
    >{info}</div>
  )
};

export default Badge;