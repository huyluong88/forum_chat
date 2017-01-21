import React, { Component } from 'react';
import base from './config'

class Forum extends Component {
 constructor() {
     super()
     this.state = {
         userName: "",
         forum: "",
         room: []
     }
 }

 componentDidMount() {
     base.fetch(`${this.props.params.forum}`, {
         context: this,
         then: (data) => {
             this.setState({
                 forum: data
             })
         }
     })
     this.sync = base.syncState(`${this.props.params.forum}/room`, {
         state: 'room',
         context: this,
         asArray: true
     })
 }

 componentWillReceiveProps(nextProps) {
     base.fetch(`${nextProps.params.forum}`, {
         context: this,
         then: (data) => {
             this.setState({
                 forum: data
             })
         }
     })
     base.removeBinding(this.sync)
     this.sync = base.syncState(`${nextProps.params.forum}/room`, {
         state: 'room',
         context: this,
         asArray: true
     })
 }

 signUp() {
     const password = this.password.value
     if (password.length < 6) {
         alert('password must be 6 or more characters')
     } else {
         base.createUser({
             email: this.email.value,
             password: this.password.value
         })
         const email = this.email.value
         this.setState({
             userName: email
         }, () => {
             this.email.value = '',
                 this.password.value = ''
         })
     }
 }

 logIn() {
     base.authWithPassword({
         email: this.email.value,
         password: this.password.value
     }, this.authStateChanged.bind(this)).catch(err => console.error(err))
 }

 logOut() {
     this.setState({
         userName: ''
     }, () => {
         this.email.value = '',
             this.password.value = ''
     })
     base.unauth()
 }

 authStateChanged(error, user) {
     if (error) {
         alert('wrong password')
     } else if (user) {
         console.log('auth state changed ', user)
         this.setState({
             userName: user.email
         })
     }
 }

 addMessage(event) {
     var date = new Date()
     event.preventDefault()
     let newMessage = {
         username: `${this.state.userName}`,
         message: this.message.value,
         time: `${date}`
     }
     let newMessagesArray = this.state.room.concat(newMessage)
     this.setState({
         room: newMessagesArray
     })
     this.message.value = ''
 }

 deletePost(clickedPost) {
     var newRoom = this.state.room.filter(text => text !== clickedPost)
     this.setState({
         room: newRoom
     })
 }
 render() {
   return (
     <div>
       <h3>You are in: {this.props.params.forum}</h3>

       <form hidden={this.state.userName}>
         <input
         ref={node => this.email = node}
         placeholder="email" />
         <input
         ref={node => this.password = node}
         placeholder="password"
         type='password' />
         <button
           type="submit"
           onClick={this.signUp.bind(this)}>Sign Up</button>
         <button
           type="submit"
           onClick={this.logIn.bind(this)}>Log In</button>
       </form>

       <button
         type="submit"
         onClick={this.logOut.bind(this)}
         hidden={!this.state.userName}>
         Log Out
       </button>

       <ul>
          {this.state.room.map((text, index) => {
           return <li key={index}>{text.username}: {text.message} posted at {text.time}
           <button onClick={this.deletePost.bind(this, text)}>X</button>
           </li>
         })}
       </ul>

       <form hidden={!this.state.userName}>
          <input
           ref={element => this.message = element}
           placeholder="type a message"/>

           <button
           onClick={this.addMessage.bind(this)}>
           Send Message
          </button>
       </form>
      </div>
   );
 }
}

export default Forum;
