import React, { Component } from 'react';
import base from './config.js'
import { Link } from 'react-router';
import './App.css';

class App extends Component {

 constructor () {
   super()
   this.state = {
     forums: []
   }
 }

 componentDidMount () {
   base.fetch('subforums', {
     context: this,
     asArray: true,
     then: (data) => {
       this.setState({
         forums: data
       })
     }
   })
 }

 render() {
   return (
     <div className="App">
       <div className="App-header">
       <h2>Welcome to FireForums</h2>
       </div>

       <p className="App-intro">
         Here are the following forums:
       </p>
         <ul>
           {this.state.forums.map(forum => {
             return (
               <li key={forum}><Link
             to= {forum}>{forum}</Link></li>
           )
           })}
         </ul>
         {this.props.children}
     </div>
   );
 }
}

export default App;
