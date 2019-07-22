import React, {Component,Fragment} from 'react';
import SocketIO from 'socket.io-client';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Message from './Message';
import Axios from 'axios';
import Spinner from './Spinner';

export default class PrivateChat extends Component{
  constructor(props){
    super(props);
    this.state={
      socketUrl:'http://localhost:5000/chats',
      message:'',
      messages:[],
      error:'',
      loading:false,
      socketId:'',
      receiverInfo:{}
    }
    this.socket=SocketIO.connect(this.state.socketUrl);
  }

  componentWillMount=async ()=>{
    const {params}=this.props.match;
    this.setState({
      loading:true
    });
    try{
      const res = await Axios.get(`http://localhost:3000/api/profiles/${params.username}`);
      console.log(res.data.profile);
      this.setState({
        loading:false,
        receiverInfo:res.data.profile
      });
    } catch(error){
      console.log(error.response.data.message);
      this.setState({
        error:error.response.data.message,
        loading:false
      });
    }

    try{
      const token=localStorage.getItem('ACCESS_TOKEN');
      const res=await Axios.get(`http://localhost:3000/api/chats/${params.username}`,{
        headers:{
          token
        }
      });
      console.log(res.data.messages);
      res.data.messages.map(message=>{
        const single={};
        single.message=message.message;
        single.sender=message.sender.username;
        single.receiver=message.receiver.username;
        single.time=message.createdAt;
        console.log(single);
        this.setState({
          messages:[...this.state.messages,single]
        });
      });
      // this.setState({
      //   messages:res.data.messages
      // })
    } catch(error){
      console.log(error.response.data);
      if(error.response.data.message==='jwt expired'){
        toast.error('Token expired, please go login again');
        localStorage.clear();
        window.location.href='/';
      }
    }
    

  }

  componentDidMount=()=>{
    const {socket}=this;
    const token=localStorage.getItem('ACCESS_TOKEN');
    socket.on('connect',()=>{
      console.log('We are connected');
      const username=localStorage.getItem('CURRENT_USER_USERNAME');
      console.log(username);
      socket.emit('new_user',token);
    });
    socket.on('chat', (data) => {
      const {params}=this.props.match;
      const currentUser = localStorage.getItem('CURRENT_USER_USERNAME');
      console.log('CurrentUser',currentUser);
      console.log('Sender',data.sender);
      console.log('Receiver',data.receiver);
      console.log('Data sender',data.receiver,'User To Chat',params.username);
      if((data.receiver===currentUser) || (data.sender===currentUser)){
        this.setState({
          messages: [...this.state.messages, data]
        });
        
       
      }
    });

    socket.on('no_auth',({message})=>{
        toast.error(message);
    })
  }
  
  sendMessage=e=>{
    const {params}=this.props.match;
    const sender=localStorage.getItem('CURRENT_USER_USERNAME');
    e.preventDefault();
    this.socket.emit('chat',{
      message:this.state.message,
      receiver:params.username,
      sender
    });
    
  }
  render(){
    const {params}=this.props.match;
    const {message,error,loading,receiverInfo}=this.state;

    const senderNames=localStorage.getItem('CURRENT_USER_NAMES');
    const senderUsername=localStorage.getItem('CURRENT_USER_USERNAME');
    const senderEmail=localStorage.getItem('CURRENT_USER_EMAIL');
    const senderInfo={
      names:senderNames,
      email:senderEmail,
      username:senderUsername
    }
    if(loading){
      return <Spinner/>
    }
    if(error){
      toast.error('This user does not exist!');
      window.location.href='/users';
    }
    return(
      <Fragment>
        <h1
        style={{
          marginTop:20
        }}
        >Your conversation with <strong>{params.username}</strong></h1>
        <br />
        <div className='card'>
          <header className='caed-header'>
            <p className="card-header-title">
              Messages
    </p>
          </header>
          <div className='card-content'>
            <div className='list is-hoverable'>
              {this.state.messages.map(single=>(
                <Message message={single} key={single.id} receiverInfo={receiverInfo} senderInfo={senderInfo}/>
              ))}
            </div>
          </div>
          <form className='card-footer'
          onSubmit={this.sendMessage}
          >
            <div className='card-footer-item'>
              <textarea
                className='textarea'
                value={message}
                onChange={(e) =>this.setState({message:e.target.value})}
              ></textarea>
            </div>
            <div className='card-footer-item'>
              <button type='submit' className='button'>Send</button>
            </div>
          </form>
          <Link to='/logout' className='button' style={{
            marginTop:40,
            marginBottom:20
          }}>Logout</Link>
        </div>
      </Fragment>
    )
  }
}