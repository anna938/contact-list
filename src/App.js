import './App.css';
import React, { Component } from 'react'
import ListContacts from './ListContacts';
import Details from './Details';
import NewContact from './NewContact';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
//import { remove } from '../server/model';

class App extends Component {
  state = {
    contacts: []
  }
  handleEdit = (userInfo) => {
    console.log(userInfo);
   
    const index = this.state.contacts.findIndex(emp => emp._id === userInfo.id),
      contacts = [...this.state.contacts] // important to create a copy, otherwise you'll modify state outside of setState call
    contacts[index] = userInfo;
    this.setState({ contacts });

  }
  
  handleDelete = (userId) => {
    axios.delete('http://localhost:4000/delete/' + userId)
      .then(res => {
        console.log(res.data);
        // this.props.remove(userInfo);
        let updatedContact = [...this.state.contacts].filter(i => i.id !== userId);
        this.setState({ contacts: updatedContact });
        window.location = '/';
      })
  }

  onCreateContact = (contactInfo) => {
    console.log(contactInfo);
    axios.post('https://my-contact-info.herokuapp.com/newContact', contactInfo)
      .then((res) => {
        console.log(res);
      })
    window.location = '/';
  }

  componentDidMount() {
    axios.get('https://my-contact-info.herokuapp.com/')
      .then((res) => {
        console.log(res);
        this.setState({
          contacts: res.data
        })
        console.log(res.data)
      });

  }
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => <ListContacts list={this.state.contacts} handleEdit={(info) => this.handleEdit(info)} handleDelete={(userId) => this.handleDelete(userId)} />}
            />
            <Route path="/details/:contactId" component={(props) => <Details {...props} handleEdit={(info) => this.handleEdit(info)} />} />

            <Route path="/newcontact" component={(props) => <NewContact handleNewContact={(contactInfo) => this.onCreateContact(contactInfo)} />} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
