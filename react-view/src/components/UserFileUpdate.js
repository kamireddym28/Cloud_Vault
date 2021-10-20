import React, { useState } from 'react';
import axios from 'axios';
import {Container, Modal, Button, ModalBody} from 'react-bootstrap';
import urls from "./utils"

const UserFileUpdate = (params) => {
  const [file, setFile] = useState(null);

  const submitFile = async (evt) => {
    try {
      if (!file) {
        throw new Error('Select a file first!');
      }
      evt.preventDefault();
      const formData = new FormData(evt.target);
      formData.append('file', file[0]);
      formData.append('fileid',params.fileid)
      formData.append('previousFileName',params.bucketFileName)
      formData.append('userid', localStorage.getItem('userid'))
      axios.defaults.withCredentials = true;
      await axios.post(urls.backendURL+'/updateFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        let data = response.data
        if(data && data.status){
          alert("Update is successful")
        } else {
          alert("Cannot update file")
        }
      });
    } catch (error) {
      console.log(error)
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
      <Container>
           <Button onClick={handleShow}>UpdateFile</Button>
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
                    <label>Update file</label>
                    <input type="file" onChange={event => setFile(event.target.files)} />
                    <Button type="submit">Submit</Button>
                </form>
               </Modal.Body>
            </Modal>
       
      </Container>
     
    
  );
};

export default UserFileUpdate;