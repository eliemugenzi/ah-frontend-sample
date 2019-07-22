import React, {useState} from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import Spinner from './Spinner';
import { toast } from 'react-toastify';

dotenv.config();

const Login=()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);

  const loginProcess=async (e)=>{
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:3000/api/auth/login',{
        email,
        password
    }).then(async (res)=>{
      const {data:{token}}=res.data;
      try{
        const {data:{user:currentUser}} = await axios.get(`http://localhost:3000/api/chats/currentUser/?token=${token}`);
        localStorage.setItem('CURRENT_USER_ID', currentUser.id);
        localStorage.setItem('CURRENT_USER_USERNAME', currentUser.username);
        localStorage.setItem('CURRENT_USER_NAMES', `${currentUser.firstName} ${currentUser.lastName}`);
        localStorage.setItem('CURRENT_USER_EMAIL', currentUser.email);
      } catch(error){
        console.log(error.response.data);
      }
      

      localStorage.setItem('ACCESS_TOKEN',token);
      window.location.href='/users';
      setLoading(false);
    })
    .catch(error=>{
      console.log(error.response.data.data);
      setLoading(false);
    })
  
  }
  return(
    <form className='container' style={{
      marginTop:30,
      marginRight:30,
      marginLeft:30,
      display:'grid',
      placeContent:'center',
      height:'80vh',
      width:'80vw'
    }}
    onSubmit={loginProcess}
    > 
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input 
          className='input'
          type='email'
           vakue={email} 
           onChange={(e)=>setEmail(e.target.value)}
           />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Password</label>
        <div className='control'>
          <input
            className='input'
            type='password'
            vakue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button type='submit' className='button'>Login</button>
      {loading?<Spinner/>:null}
    </form>
  )
}

export default Login;