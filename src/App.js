import logo from './logo.svg';
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
    contacts: [
      //{
      //  id: 'ryan',
      //  name: 'Ryan Florence',
      //  email: 'ryan@reacttraining.com',
      //  photo: 'ryan.jpg'
      //},
      //{
      //  id: 'michael',
      //  name: 'Michael Jackson',
      //  email: 'michael@reacttraining.com',
      //  photo: 'michael.jpg'
      //},
      //{
      //  id: 'tyler',
      //  name: 'Tyler McGinnis',
      //  email: 'tyler@reacttraining.com',
      //  photo: 'tyler.jpg'
      //}
    ]
  }
  handleEdit = (userInfo) => {
    console.log(userInfo);
    //const newOne = this.state.contacts.filter((item) => item.id === userInfo.id)
    //console.log(newOne);
    //this.setState({
    //  contacts: this.state.contacts.map(el => (el.id === userInfo.id ? { ...el, userInfo } : el))
    //});
    const index = this.state.contacts.findIndex(emp => emp._id === userInfo.id),
      contacts = [...this.state.contacts] // important to create a copy, otherwise you'll modify state outside of setState call
    contacts[index] = userInfo;
    this.setState({ contacts });

  }
  //handleDelete = (userId) => {
  //  this.setState({
  //    contacts: this.state.contacts.filter((item) => item._id !== userId)

  //  })
  //}
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

  // remove(){


  //}
  onCreateContact = (contactInfo) => {
    console.log(contactInfo);
    axios.post('http://localhost:4000/newContact', contactInfo)
      .then((res) => {
        console.log(res);
      })
    window.location = '/';
  }

  componentDidMount() {
    axios.get('http://localhost:4000')
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
//contact={this.state.contacts.filter((contact) => contact._id === props.match.params.contactId)} handleEdit={(info) => this.handleEdit(info)}
export default App;
