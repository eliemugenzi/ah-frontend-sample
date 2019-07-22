import React, {Fragment, Component} from 'react';
import SockIO from 'socket.io-client';

export default class SocketIO extends Component{
  constructor(props){
    super(props);
    this.state={
      socketUrl:'http://localhost:5000/chats'
    }
  }

  componentWillMount=()=>{
    const {socketUrl}=this.state;
    const socket=SockIO.connect(socketUrl);
    socket.on('chat',data=>{
      console.log(data);
    })
  }

  render(){
    return <Fragment/>
  }
}