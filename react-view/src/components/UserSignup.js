import React,{Component} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import urls from "./utils"

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
    render(){
        return(
            <div>
            <div id="FixedTop" class="fixed-top text-light bg-dark"><h4>SIGN UP</h4></div>
            <Container>
                <Row className="signup_signin_panel">
                    <Col xs={6}  className="card signupsignin-card">
                        <h5 id="SignInText">Signup User</h5>    
                            <hr/>
                        <form onSubmit={this.formSubmit}>
                            <div className="form-group">
                                <label className="control-label">First Name</label>
                                <input type="text" required name="fname" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Last Name</label>
                                <input type="text" required name="lname" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Email</label>
                                <input type="email" required name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <input type="password" required name="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                            {this.state.displayMessage}
                        </form>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}
export default UserSignup;