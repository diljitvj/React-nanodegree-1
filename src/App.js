import React, { Component } from 'react'
import ListContacts from './listContacts.js'
import * as ContactsApi from "./utils/ContactsAPI"
import CreateContact from './CreateContact.js'
import { Route } from 'react-router-dom'

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
  onCreateContact = (values)=>{
    console.log(values);
    ContactsApi.create(values)
      .then((contact)=>{
        this.setState({
          contacts: this.state.contacts.concat(contact)
        })
      })
  }
  render() {
    return (
      <div className="App">
        <Route 
          path="/" exact
          render={
            ()=>(
            <ListContacts 
              onDeleteContact={this.removeContact} 
              contacts={this.state.contacts}/>
            )
          } />
          <Route
            path="/create" exact
            render={
              ({history})=>(
                <CreateContact onCreateContact={
                  (contact)=>{
                    this.onCreateContact(contact);
                    history.push('/'); 
                  }
                }/>
              )
            } />
      </div>
    );
  }
}

export default App;
