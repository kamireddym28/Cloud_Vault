import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import UserSignup from './components/UserSignup.js';
import UserSignin from './components/UserSignin.js';
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
                <Route path="/usersignup" component={UserSignup}/>
                <Route path="/usersignin" component={UserSignin}/>
                <Route path="/fileupload" component={UserFileUpload}/>
                <Route path="/updatefile" component={UpdateFile}/>
                <Route path="/userdashboard" component={UserDashboard}/>
                <Route path="/admindashboard" component={AdminDashboard}/>
            </Switch>
        )
    }
}

export default Main;