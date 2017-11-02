import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput.js'
import serializeForm from 'form-serialize'

class CreateContact extends Component{
    handleSubmit = (e)=>{
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})
        // console.log(values);
        if(this.props.onCreateContact){
            this.props.onCreateContact(values);
        }
    }
    render(){
        return(
            <div>
                <Link 
                    className="close-create-contact"
                    to="/">Close</Link>
                <form className="create-contact-form" onSubmit={this.handleSubmit}> 
                    <ImageInput className="create-contact-avatar-input"
                        name="avatarURL"
                        maxHeight={64}></ImageInput>
                        <div className="create-contact-details">
                            <input type="text" name="name" placeholder="Name" className=""/>
                            <input type="text" name="email" placeholder="Email" className=""/>
                            <button>Add Contact</button>
                        </div>
                </form>
            </div>
        )
    }    
}
export default CreateContact;