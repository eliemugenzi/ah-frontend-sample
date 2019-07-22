import React ,{Component,Fragment} from 'react';
import SocketIO from 'socket.io-client';
import axios from 'axios';
import User from './User';

export default class Users extends Component{
  constructor(props){
    super(props);
    this.state={
      users:[],
      me:{},
      warning:''
    }

    this.socket=SocketIO.connect('http://localhost:5000');
  }

  componentWillMount=()=>{
    const {socket}=this;
    const token=localStorage.getItem('ACCESS_TOKEN');
    socket.on('connect',()=>{
      socket.emit('user_back',token);
    });

    const currentUser = localStorage.getItem('CURRENT_USER_USERNAME');
    socket.on('message_unread', ({ receiver, unreadCount }) => {
      console.log('Something is happening...');
      if (currentUser === receiver) {
        this.setState({
          warning: `You have ${unreadCount} messages unread`
        });
      }
    });
    
  }

  componentDidMount=()=>{
    const token=localStorage.getItem('ACCESS_TOKEN');
    axios.get('http://localhost:3000/api/chats/users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token
      }
    }).then(res => {
      console.log(res.data);
      const meData = res.data.me;
      const { data } = res;
      if (data.followers.length) {
        let availUsers = [];
        data.followers.forEach(follower => {
          if (follower.userId === meData.id) {
            availUsers.push(follower.follower);
          }
          else {
            availUsers.push(follower.followedUser);
          }
        });
        this.setState({
          users:availUsers
        });
      }
      this.setState({
        me:meData
      })
      
    }).catch(error => {
      console.log(error);
      console.log(error.response.data.message);
      if (error.response.data.message === 'jwt expired' || error.response.data.error) {
        window.location.href = '/';
      }
    });
  }

  render(){
    const {me,users,warning}=this.state;
    return (
      <Fragment>
        <div>Welcome back {me.firstName} {me.lastName}, select users to chat with.</div>
        <div className='list is-hoverable' style={{
          marginLeft: '10%',
          marginRight: '10%'
        }}>
          {users.map(single => (
            <User user={single} key={single.id} />
          )) || <p>No users yet!</p>}
        </div>
        {warning?(
          <div className='notification is-warning'>
            {warning}
          </div>
          ):null}
          {!users.length?(
            <div className='notification is-danger'>
              <p>No users to chat with...</p>
            </div>
          ):null}
      </Fragment>
    )
  }
}