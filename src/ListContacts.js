import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//import imgt from './assets'
import Popup from './Popup'


export default class ListContacts extends Component {
    state = {
        //showModal: false,
        id: '',
        query: '',
        photo: ''
    }
    handleClicked = (id) => {
        //this.setState({ showModal: !this.state.showModal, id: id })
    }
    handleEdit = (userInfo) => {
        console.log(userInfo)
    }
    handleDelete = (userId) => {
        console.log(userId)
        this.props.handleDelete(userId);
    }
    updateQuery = (query) => {
        this.setState({ query: query })
    }


    render() {
        const { list } = this.props;
        const { query } = this.state;
        const filteredList = query === ''
            ? list :
            list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        //const arrayBufferToBase64 = (buffer) => {
        //    var binary = '';
        //    var bytes = [].slice.call(new Uint8Array(buffer));
        //    bytes.forEach((b) => binary += String.fromCharCode(b));
        //    return binary;
        //};
        //const imageBuffer = (buffer) => {
        //    var base64Flag = 'data:image/jpeg;base64,';
        //    var imageStr = arrayBufferToBase64(buffer);

        //    this.setState({
        //        pohto: base64Flag + imageStr
        //    })
        //}
        //imageBuffer(this.props.list.photo);
        return (
            <React.Fragment>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        //value={ }
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/newcontact'
                        className='add-contact'
                    >Add Contact</Link>
                </div>
                <div className="listWrapper">
                    {filteredList.map((item) => (
                        <div className="list" key={item._id}>
                            {item.photo !== '' ?


                                <img src={`images/${item.photo}`} alt="profile" />
                                //<img src={`data:image/jpg;charset=utf-8;base64,${item.photo}`} alt="profile" />
                                :
                                <img src="images/placeholder.jpg" allt="user placeholder" />
                            }
                            <Link to={`details/${item._id}`}><h2>{item.name}</h2></Link>

                            <button className="contactRemove" onClick={(id) => this.handleDelete(`${item._id}`)}>Delete</button>
                        </div>
                    ))}
                    {/*{this.state.showModal ?
                        <Popup handleEdit={this.props.handleEdit} id={this.state.id} contact={this.props.list.filter((contact) => contact._id === this.state.id)} />
                        : ''}*/}
                </div>
            </React.Fragment>
        )
    }
}
