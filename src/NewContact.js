import React, { Component } from 'react'
import { Link } from 'react-router-dom'
let fileInfo;
class NewContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        photo: ''
    }
    handleChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleFile = (e) => {

        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);
        this.setState({ ...this.state, [e.target.name]: e.target.files[0].name });
        fileInfo = e.target.files[0];
        //this.setFile();
        //console.log(fileInfo);
        //fileUpload = true;

    }
    handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('phone', this.state.phone);
        formData.append('photo', fileInfo);

        if (this.props.handleNewContact) {
            this.props.handleNewContact(formData)
        }

    }
    render() {
        return (
            <div>
                <Link to="/" className="close-create-contact">Close</Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form' encType='multipart/form-data'>
                    {/*<ImageInput
                    className='create-contact-avatar-input'
                    name='avatarURL'
                    maxHeight={64} />*/}
                    <div className='create-contact-details'>
                        <input name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChanged} />
                        <input name="email" placeholder="Email" type="text" value={this.state.email} onChange={this.handleChanged} />
                        <input name="phone" placeholder="Phone" type="text" value={this.state.phone} onChange={this.handleChanged} />
                        <input name="photo" type="file" onChange={this.handleFile} />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default NewContact;