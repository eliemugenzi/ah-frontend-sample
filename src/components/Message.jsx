import React ,{Fragment} from 'react';
import Avatar from './Avatar';

const Message=({message})=>{
  const currentUser=localStorage.getItem('CURRENT_USER_USERNAME');
  if(message.sender===currentUser){
    return(
      <Fragment>
        <div className='list-item'>
          <div className='columns is-mobile'>
            <div className='column is-two-thirds'>
              <i>{message.message}</i>
            </div>
            <div className='column is-one-third'>
              <div className='columns is-mobile' style={{
                padding:20
              }}>
                  <Avatar/> &nbsp; &nbsp;
                  <strong>{currentUser}</strong>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  else{
    return(
      <Fragment>
        <div className='list-item'>
          <div className='columns is-mobile'>
            <div className='column is-one-third'>
              <div className='columns is-mobile' style={{
                padding:20
              }}>
                <Avatar />
                <strong>{message.sender}</strong>
              </div>
            </div>
            <div className='column is-two-thirds'><i>{message.message}</i></div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Message;