import React,{Component} from "react";
import {Container, Row, Col, Navbar} from 'react-bootstrap';
import axios from 'axios';
import {Redirect}  from 'react-router';
import urls from './utils'

export class AdminSignin extends Component{
    state={
        message : "",
        submitHandler : ""
    }
    constructor(props){
        super(props);
        this.state.message = "";
        this.submitHandler = this.submitHandler.bind(this);
    }
    async submitHandler(evt){
        evt.preventDefault();
        console.log(evt.target);
        var formData = new FormData(evt.target);
        axios.defaults.withCredentials = true;
        await axios({
            method: 'post',
            url: urls.backendURL+"/adminsignin",
            // data: {"jsonData" : JSON.stringify(data)},
            data: { "email": formData.get('email'), "password": formData.get('password')},
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                if (response.status >= 500) {
                    throw new Error("Bad response from server");
                }
                return response.data;
            })
            .then((responseData) => {
                if(responseData.status){
                    this.setState({
                        message: responseData.message
                    });
                    localStorage.setItem("adminid",responseData.adminid)
                    localStorage.setItem("firstname",responseData.firstname)
                    localStorage.setItem("lastname",responseData.lastname)
                } else{
                    alert(responseData.message);
                }
            }).catch(function (err) {
                console.log(err)
            });
    }

    render(){
        let adminid = localStorage.getItem("adminid");
        console.log("backendurl.."+urls.backendURL)
        let redirectTo = <div></div>
        if(adminid){
            redirectTo = <Redirect to="/admindashboard"/>
        }
        return(
            <div>
            {/* <Navbar bg="dark" variant="dark" sticky="top">
               <Navbar.Brand>File Manager</Navbar.Brand>
        </Navbar>*/}
            <Container>
            {redirectTo}
                <Row className="adminpanel">
                    <Col xs={6} className="card admincard">
                        <h5 id="SignInText">Admin Sign In</h5>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <input type="email" name="email" required className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" required className="form-control" placeholder=" Password"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                            <div className = "form-group">
                                <label> Click <a href="/adminsignup">here</a> to Signup</label>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default AdminSignin;