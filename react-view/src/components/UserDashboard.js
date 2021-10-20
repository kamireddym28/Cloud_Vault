import React,{Component} from "react";
import {Table, Button, Container} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import UserFileUpload from "./UserFileUpload"
import UserFileUpdate from "./UserFileUpdate"
import urls from "./utils"

export class UserDashboard extends Component{
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
            url: urls.backendURL+"/fetchUserFiles?userid="+localStorage.getItem("userid"),
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
                const download_url = "https://d2fm7gtvkx48d9.cloudfront.net/"+file.bucketFileName
                tdMarkup.push(<td>{localStorage.getItem("firstname")}</td>)
                tdMarkup.push(<td>{localStorage.getItem("lastname")}</td>)
                tdMarkup.push(<td>{file.filename}</td>)
                tdMarkup.push(<td>{file.filedescription}</td>)
                tdMarkup.push(<td>{file.dateuploaded}</td>)
                tdMarkup.push(<td>{file.datemodified}</td>)
                tdMarkup.push(<td><UserFileUpdate fileid={file.fileid} bucketFileName={file.bucketFileName}/></td>)
                tdMarkup.push(<td><a href = {download_url} target="_blank"><Button>Download</Button></a></td>)
                tdMarkup.push(<td><Button onClick={()=>this.deleteFile(file.fileid, file.bucketFileName)}>DeleteFile</Button></td>) 
                fileMarkup.push(<tr key={file.fileid}>{tdMarkup}</tr>)
            }
        }
        return fileMarkup
    }

    renderBody(){
        if(this.state.loading){
            return (<div></div>)
        } else if (!this.state.fileList || this.state.fileList.length == 0){
            return ( 
                <div>No files</div>
                )
        } else {
            return(
              
                <Table>
                    <thead>
                        <tr>
                        <th>First Name</th> <th>Last Name</th> <th>File name</th>  <th>File Description</th>  <th>Date uploaded</th> <th>Date modified</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderAllFiles()}
                     </tbody>
                </Table>
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
        let userid = localStorage.getItem("userid");
        let redirectTo = <div></div>
        if(!userid){
            redirectTo = <Redirect to="/usersignin"/>
        }
        let firstname = localStorage.getItem("firstname")
        let lastname = localStorage.getItem("lastname")
        
    return (<Container>
        {redirectTo}
        <div className="fixed-top text-light bg-dark"><h4>User Dashboard</h4>
            <span>{firstname+" "+lastname}</span>&nbsp;&nbsp;
            <span><a onClick={()=>this.logoff()}>Logoff</a></span>
        </div>
        <br/><br/>
        <UserFileUpload></UserFileUpload>
        {this.renderBody()}
    </Container>)
        
    }
    
}

export default UserDashboard;