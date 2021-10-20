import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import UserSignup from './components/UserSignup.js';
import UserSignin from './components/UserSignin.js';
import AdminSignup from './components/AdminSignup.js';
import AdminSignin from './components/AdminSignin.js';
import UserFileUpload from './components/UserFileUpload.js';
import UpdateFile from './components/UserFileUpdate.js';
import UserDashboard from './components/UserDashboard.js';
import AdminDashboard from './components/AdminDashboard.js';

export class Main extends Component {
    render(){
        console.log("react version...");
        console.log(React.version);
        return(
            <Switch>
                <Route exact path="/" component={UserSignin}/>
                <Route path="/usersignup" component={UserSignup}/>
                <Route path="/usersignin" component={UserSignin}/>
                <Route path="/adminsignup" component={AdminSignup}/>
                <Route path="/adminsignin" component={AdminSignin}/>
                <Route path="/fileupload" component={UserFileUpload}/>
                <Route path="/updatefile" component={UpdateFile}/>
                <Route path="/userdashboard" component={UserDashboard}/>
                <Route path="/admindashboard" component={AdminDashboard}/>
            </Switch>
        )
    }
}

export default Main;