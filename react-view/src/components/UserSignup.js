import React,{Component} from "react";
import {Container, Row, Col, Navbar} from 'react-bootstrap';
import axios from 'axios';
import urls from "./utils"
import {Header} from "./Header";

export class UserSignup extends Component{
    state = {
        formSubmit : "",
        displayMessage : ""
    }
    constructor(props){
        super(props);
        this.state.displayMessage = "";
        this.formSubmit = this.formSubmit.bind(this);
    }
    async formSubmit(evt){
        evt.preventDefault();
        console.log(evt.target);
        var formData = new FormData(evt.target);
        axios.defaults.withCredentials = true;
        await axios({
            method: 'post',
            url: urls.backendURL+"/serversignup",
            data: { "fname": formData.get('fname'), "lname": formData.get('lname'),"email": formData.get('email'), "password": formData.get('password')},
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                let showDisplayMessage=(message)=>{
                    return(
                        <div className = "form-group">
                            <label>{message} Click <a href="/usersignin">here</a> to login</label>
                        </div>
                    );
                }
                if(responseData.status){
                    this.setState({
                        displayMessage : showDisplayMessage(responseData.message)
                    });
                } else{
                    this.setState({
                        displayMessage : responseData.message
                    })
                }
            }).catch(function (err) {
                console.log(err)
            });
    }
    showSignInText(){
        if(!this.state.displayMessage){
            return(
                <div className = "form-group">
                    <label>Click <a href="/usersignin">here</a> to login</label>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
           {/* <Navbar bg="dark" variant="dark" sticky="top">
               <Navbar.Brand>File Manager</Navbar.Brand>
        </Navbar>*/}
            <Container>
                {Header}
                <Row className="userpanel">
                    <Col xs={6}  className="card usercard">
                        <h5> User Signup</h5>
                        <form onSubmit={this.formSubmit}>
                            <div className="form-group">
                                <input type="text" required name="fname" placeholder="First Name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="text" required name="lname"  placeholder="Last Name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="email" required name="email"  placeholder="Email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="password" required name="password"  placeholder="Password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                            {this.state.displayMessage}
                            {this.showSignInText()}
                        </form>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}
export default UserSignup;