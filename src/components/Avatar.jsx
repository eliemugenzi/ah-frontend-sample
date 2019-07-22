import React,{Fragment} from 'react';

const Avatar=()=>{
  return(
    <Fragment>
      <img 
      className='is-rounded'
       alt='chat-avatar'
       style={{
         width:30,
         height:30
       }}
        src='http://www.sclance.com/pngs/png-avatar/png_avatar_1048755.png'
       />
    </Fragment>
  )
}

export default Avatar;