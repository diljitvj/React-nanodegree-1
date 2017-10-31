import React, { Component } from 'react'
import ListContacts from './listContacts.js'
import * as ContactsApi from "./utils/ContactsAPI"

class App extends Component {
  state = {
    contacts : []
  }
  componentDidMount(){
    ContactsApi.getAll()
      .then((contacts)=>{
        this.setState({contacts: contacts})
      })
  }
  removeContact = (contact) =>{
    ContactsApi.remove(contact)
      .then((contact)=>{
        console.log(contact);
        this.setState((state)=>({
          contacts : state.contacts.filter((c)=>{
            return c.id!== contact.id;
          }) 
        }))
      })
  }
  render() {
    return (
      <div className="App">
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
      </div>
    );
  }
}

export default App;
