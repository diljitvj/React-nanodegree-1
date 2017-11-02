import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegEx from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component{
  static protoTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }
  state = {
    query : ''
  }
  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }
  resetQuery = ()=>{
    this.setState({query: ''})
  }
  render(){
    const { query } = this.state
    const { contacts, onDeleteContact } = this.props
    let showingContacts
    if(query){
      const match = new RegExp(escapeRegEx(query),'i')
      showingContacts = contacts.filter((contact)=> match.test(contact.name))
    } else {
      showingContacts = contacts
    }
    showingContacts.sort(sortBy('name'))
    let showCount = showingContacts.length
    let totalCount = contacts.length
    return (
      <div className="list-contacts">
          <div className="list-contacts-top">
            <input
              className="search-contacts"
              type="text"
              placeholder="Search Contacts"
              value={query}
              onChange={(event)=>{this.updateQuery(event.target.value)}}
            />
            <Link 
              to="/create"
              className="add-contact">Add Contact</Link>
          </div>
          {(query)&&(
            <div className="showing-contacts">
              <span>Now showing {showCount} of {totalCount}</span>
              <button onClick={this.resetQuery}>Show all</button>
            </div>
          )}
          <ol className="contact-list">
            {
              showingContacts.map((contact) => (
                <li key={contact.id} className="contact-list-item">
                  <div className="contact-avatar" style={{
                    backgroundImage: `url(${contact.avatarURL})`
                  }} />
                  <div className="contact-details">
                    <p>
                      {contact.name}
                    </p>
                    <p>
                      {contact.name}
                    </p>
                  </div>
                  <button className="contact-remove" onClick={() => { onDeleteContact(contact) }}>
                    Remove
                      </button>
                </li>
              )
            )
          }
        </ol>
      </div>
      )
  }
}

export default ListContacts