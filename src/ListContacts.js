import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ListContacts extends Component {
    state = {
        id: '',
        query: '',
        photo: ''
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
                              
                                :
                                <img src="images/placeholder.jpg" allt="user placeholder" />
                            }
                            <Link to={`details/${item._id}`}><h2>{item.name}</h2></Link>

                            <button className="contactRemove" onClick={(id) => this.handleDelete(`${item._id}`)}>Delete</button>
                        </div>
                    ))}
                   
                </div>
            </React.Fragment>
        )
    }
}
