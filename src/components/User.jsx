import React from 'react';
import {Link} from 'react-router-dom';
const User=({user})=>{
  const linkToUser=`/chats/${user.username}`;
  return(
    <Link className='list-item' to={linkToUser}>
      {user.username}
    </Link>
  )
}

export default User;