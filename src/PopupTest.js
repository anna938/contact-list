import React, { Component } from 'react'
import axios from 'axios';
let fileInfo;
let fileUpload = false;
class PopupTest extends Component {
    state = {
        name: this.props.contact.name,
        email: this.props.contact.email,
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
        this.setState({ ...this.state, [e.target.name]: e.target.files[0].name });
        fileInfo = e.target.files[0];
        //this.setFile();
        fileUpload = true;

    }
    //setFile = () => {
    //    const userInfo = { ...this.state, id: this.props.contact.id }
    //    console.log(userInfo);
    //    this.props.handleEdit(userInfo);
    //}
    handleSubmit = (e) => {
        //e.preventDefault();
        //console.log(e.target.elements.photo.files[0]);
        //const formData = new FormData()
        //formData.append('photo', this.stat);
        //console.log(formData)
        //axios.post("http://localhost:8000/upload", formData, { // receive two parameter endpoint url ,form data 
        //})
        //    .then(res => { // then print response status
        //        console.log(res);
        //        const userInfo = { ...this.state, id: this.props.contact.id }
        //        //console.log(userInfo)
        //        this.props.handleEdit(userInfo);

        //    })


    }
    handleEdit = (e) => {
        e.preventDefault()
        console.log(fileInfo);
        if (fileUpload) {
            const formData = new FormData()
            formData.append('photo', fileInfo);
            console.log(formData)
            axios.post("http://localhost:5000/photo", formData, { // receive two parameter endpoint url ,form data 
            })
                .then(res => { // then print response status
                    console.log(res);
                    const userInfo = { ...this.state, id: this.props.contact.id }
                    console.log(userInfo)
                    this.props.handleEdit(userInfo);

                })
        }
        else {
            const userInfo = { ...this.state, id: this.props.contact.id }
            console.log(userInfo)
            this.props.handleEdit(userInfo);
        }
        //const userInfo = { ...this.state, id: this.props.contact.id }
        //console.log(userInfo)
        //this.props.handleEdit(userInfo);

    }

    render() {
        return (
            <div>
                <div className="header">
                    <p>Close</p>
                </div>
                <div className="content">
                    <form>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChanged} />
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChanged} />
                        <input name="photo" type="file" value={this.state.file} onChange={this.handleFile} />
                        <button onClick={this.handleEdit} >Save Changes</button>
                        {/*<button onClick={this.handleEdit} >Save Changes</button>*/}
                    </form>
                    <p>{this.state.name}</p>
                </div>
            </div>
        )
    }
}

export default PopupTest
