import React,{Component} from "react";
import {Table, Row, Col, Button, Container, Navbar} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import UserFileUpdate from "./UserFileUpdate"
import urls from "./utils"

export class AdminDashboard extends Component{
    state={
        fileList:"",
        loading: true,
        reload:false
    }
    constructor(props){
        super(props);
    }
    async componentDidMount() {
        await axios({
            method: 'get',
            url: urls.backendURL+"/fetchAdminFiles",
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            if(responseData.status){
                this.setState({
                    loading: false,
                    fileList: responseData.fileList
                });
            } else{
                alert(responseData.message);
            }
        }).catch(function (err) {
            console.log(err)
        });
    }
    deleteFile = (fileid, bucketFileName) =>{
         axios({
            method: 'get',
            url: urls.backendURL+"/deleteFile?fileid="+fileid+"&bucketFileName="+bucketFileName,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then((response) => {
            if (response.status >= 500) {
                throw new Error("Bad response from server");
            }
            return response.data;
        })
        .then((responseData) => {
            if(responseData.status){
                alert("File deleted successfully!")
            } else{
                alert("Cannot delete file!")
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    renderAllFiles = () =>{
        let fileMarkup = []
        if(this.state.fileList && this.state.fileList.length >0){
            for(let file of this.state.fileList){
                let tdMarkup = []
                tdMarkup.push(<td>{file.filename}</td>)
                tdMarkup.push(<td>{file.filedescription}</td>)
                tdMarkup.push(<td>{file.dateuploaded}</td>)
                tdMarkup.push(<td>{file.datemodified}</td>)
                tdMarkup.push(<td>{file.firstname+" "+file.lastname}</td>)
                tdMarkup.push(<td><UserFileUpdate fileid={file.fileid} bucketFileName={file.bucketFileName}/></td>)
                tdMarkup.push(<td><Button onClick={()=>this.deleteFile(file.fileid, file.bucketFileName)}>DeleteFile</Button></td>)
                fileMarkup.push(<tr>{tdMarkup}</tr>)
            }
        }
        return fileMarkup
    }

    renderBody(){
        if(this.state.loading){
            return (<div></div>)
        } else if (!this.state.fileList || this.state.fileList.length == 0){
            return <div>No files are uploaded by users</div>
        } else {
            return(
                <div>
                <h5>
                   Files uploaded by Users
                </h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                         <th>File name</th>  <th>File Description</th>  <th>Date uploaded</th> <th>Date modified</th> <th>User name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAllFiles()}
                    </tbody>
                </Table>
                </div>
             );
        }
    }
    logoff(){
        localStorage.clear()
        this.setState({
            reload:true
        })
    }

    render(){
        let adminid = localStorage.getItem("adminid");
        let redirectTo = <div></div>
        if(!adminid){
            redirectTo = <Redirect to="/adminsignin"/>
        }
        let firstname = localStorage.getItem("firstname")
        let lastname = localStorage.getItem("lastname")
        return (
            <div>
                <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        <Navbar.Brand style={{marginLeft:"auto"}}>{firstname+" "+lastname}</Navbar.Brand>
        &nbsp;&nbsp;&nbsp;
        <Navbar.Brand><a onClick={()=>this.logoff()}>Logout</a></Navbar.Brand>
        </Navbar>
        <Container>
        {redirectTo}
        <br/><br/>
            {this.renderBody()}
        </Container>
        </div>
        )
    }
}

export default AdminDashboard;