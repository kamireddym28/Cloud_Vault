import React, { useState } from 'react';
import {Container, Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import urls from "./utils"

const UserFileUpload = () => {
  const [file, setFile] = useState(null);

  const submitFile = async (evt) => {
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      evt.preventDefault();
      const formData = new FormData(evt.target);
      formData.append('file', file[0]);
      formData.append('userid', localStorage.getItem('userid'))
      formData.append('firstname', localStorage.getItem('firstname'))
      formData.append('lastname', localStorage.getItem('lastname'))
      axios.defaults.withCredentials = true;
      await axios.post(urls.backendURL+'/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        let data = response.data
        if(data && data.status){
          alert("File uploaded successfully")
        } else {
          alert("Cannot upload file")
        }
      });;
      
    } catch (error) {
      
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Button onClick={handleShow}>Upload File</Button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>File Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={submitFile}>
              <div className="form-group">
                  <label className="control-label">File Name</label>
                  <input type="text" required name="filename" className="form-control" />
              </div>
              <div className="form-group">
                  <label className="control-label">File Description</label>
                  <input type="text" required name="filedesc" className="form-control" />
              </div>
            <label>Upload file</label>
            <input type="file" onChange={event => setFile(event.target.files)} />
            <Button type="submit">Submit</Button>
            <br/><br/> <br/>
          </form>
          </Modal.Body>
      </Modal>
    </Container>
    
    
  );
};

export default UserFileUpload;