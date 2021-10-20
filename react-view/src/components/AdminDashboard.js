import React,{Component} from "react";
import {Table, Row, Col, Button, Container} from 'react-bootstrap';
import axios from 'axios';
import UserFileUpdate from "./UserFileUpdate"
import urls from "./utils"


export class AdminDashboard extends Component{
    state={
        fileList:"",
        loading: true
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
                tdMarkup.push(<td>{localStorage.getItem("firstname")}</td>)
                tdMarkup.push(<td>{localStorage.getItem("lastname")}</td>)
                tdMarkup.push(<td>{file.filename}</td>)
                tdMarkup.push(<td>{file.filedescription}</td>)
                tdMarkup.push(<td>{file.dateuploaded}</td>)
                tdMarkup.push(<td>{file.datemodified}</td>)
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
            return <div>No files</div>
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
    
    render(){
    return (
    <Container>
        {this.renderBody()}
    </Container>)
        
    }
    
}

export default AdminDashboard;