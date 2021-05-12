import React, { Component } from 'react'
import axios from 'axios';

let fileInfo = '';

class Popup extends Component {
    state = {
        name: this.props.contact.name,
        email: this.props.contact.email,
        phone: this.props.contact.phone,
        photo: this.props.contact.photo
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
        //e.preventDefault();
        this.setState({ ...this.state, [e.target.name]: e.target.files[0].name });
        fileInfo = e.target.files[0];
       }


    handleEdit = (e) => {
        console.log('edit');
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('phone', this.state.phone);
        if (fileInfo !== '') {
            formData.append('photo', fileInfo);
        }
        else {
            formData.append('photo', this.state.photo);
        }
       
        
        const userInfo = { ...this.state, _id: this.props.contact._id }
        console.log(userInfo)
        //this.props.handleEdit(userInfo);
        axios.put('https://my-contact-info.herokuapp.com/update/' + this.props.contact._id, formData)
            .then(res => {
                console.log(res.data);
                this.props.handleEdit(formData);
            }
            );

        window.location = '/';
        

    }

    render() {
        return (
            <div className="popupWrapper">
                <div className="popup">
                    <div className="header">
                        <h2>Edit Profile</h2>
                        <button onClick={this.props.handleClicked}>X</button>
                    </div>
                    <div className="content">
                        <form>
                            <input name="name" type="text" value={this.state.name} onChange={this.handleChanged} />
                            <input name="email" type="text" value={this.state.email} onChange={this.handleChanged} />
                            <input name="phone" type="text" value={this.state.phone} onChange={this.handleChanged} />
                            <input name="photo" type="file" onChange={this.handleFile} />
                            <button onClick={this.handleEdit} >Save Changes</button>
                            {/*<button onClick={this.handleEdit} >Save Changes</button>*/}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup
