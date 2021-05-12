import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Popup from './Popup'
import axios from 'axios';


class Details extends Component {
    state = {
        showModal: false,
        currentcontact: {}
    }
    componentDidMount() {

        this.getData();


    }
    async getData() {
        const contact = await axios.get(`https://my-contact-info.herokuapp.com/details/${this.props.match.params.contactId}`)

        this.setState({ currentcontact: contact.data });
    }
    handleClicked = () => {
        //this.props.history.goBack;
        //this.props.history.goBack();
        this.setState({ showModal: !this.state.showModal })
    }
    handleEdit = (userInfo) => {
        console.log(userInfo)
    }
    closePopup = () => {

    }

    render() {
        console.log(this.state.currentcontact);
        return (
            <div className="detailsWrapper">
                <Link to="/" className="close-create-contact" >Back</Link>
                {/*<button onClick={this.props.history.goBack()} >Back2</button>*/}
                <div className="details">
                    <img src={`../images/${this.state.currentcontact.photo}`} alt="user profile"/>

                    <h2>{this.state.currentcontact.name}</h2>
                    <h2>{this.state.currentcontact.email}</h2>
                    <h2>{this.state.currentcontact.phone}</h2>
                    <button className="editBtn" onClick={this.handleClicked}>Edit</button>
                </div>

                {this.state.showModal ?
                    <Popup handleEdit={this.props.handleEdit} id={this.state.currentcontact._id} contact={this.state.currentcontact} handleClicked={this.handleClicked} />
                    : ''}
            </div>
        )
    }
}
export default Details;
