var express = require('express');
var router = express.Router();
var aws      =require('aws-sdk');
var multer   =require('multer');
var multers3 =require('multer-s3');
const path = require('path');
const dbConnPool = require("../connectionUtils");
const config = require('../config.json');

function loadAWSConfig() {
  aws.config.update({
    ...config,
    signatureVersion: 'v4',
  });
}

loadAWSConfig();

var s3 = new aws.S3({});

var upload= multer({
  storage:multers3({
    s3:s3,
    bucket:'bucket-files3',
    acl:'public-read',
    destination: function (req, file, cb) {
            cb(null, '/')
        },
    metadata: function(req,file,callback){
      callback(null,{fieldName:file.fieldname});
    },
    key:function(req,file,callback){
      console.log("in multer...");
      console.log(file)
      callback(null,Date.now()+file.originalname)
    }
  }),
  limits: {
    fileSize: 10000000   // Max limit of file that will be accepted is 10MB
  }
});

router.post("/uploadFile",upload.single('file'), async function(req, res){
  let uploadStatus = false, message="Cannot upload file"
  try {
    let {filename, filedesc, userid, firstname, lastname} = req.body;
    let dateUploaded = new Date().toLocaleString()
    let bucketFileName;
    if (req.file) {
        bucketFileName = req.file.key;
    }
    let conn = await dbConnPool.getConnection();
    await conn.query("INSERT INTO file_schema.files (userid, firstname, lastname, filename, filedescription, dateuploaded, bucketFileName) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [userid, firstname, lastname, filename, filedesc, dateUploaded, bucketFileName])
            let filedetails = {
                filename,
                filedesc,
                userid,
                bucketFileName,
                dateUploaded
                };
                console.log(filedetails)
    await conn.query('COMMIT')
    uploadStatus = true
    message = "File upload is successful"
  } catch(e){
    console.log(e)
    uploadStatus = false
  } finally{
    res.status(200).json({
        status:uploadStatus,
        message: message
    });
  }
});

  
  router.get("/deleteFile", async function(req, res){
   try {
      console.log(req.query)
      let {bucketFileName, fileid} = req.query;
      var params = {
        Bucket: 'bucket-files3',
        Key: bucketFileName
      };
      let results, fileDelStatus = false;
      s3.deleteObject(params, async function (err, data) {
        if (data) {
          console.log(data);
          let conn = await dbConnPool.getConnection();
          results = await conn.query("DELETE FROM file_schema.files WHERE fileid=?", [fileid]) 
          console.log("File deleted successfully");
          fileDelStatus = true
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
        let responseObj = {
            status:fileDelStatus,
            results
        }
        res.end(JSON.stringify(responseObj));
      });      
    } catch(e) {
      console.log(e)
  
    } finally {
      /*res.status(200).json({
          status:fileFetchStatus,
          fileList
      });*/
    }
  });

    router.post("/updateFile", upload.single('file'), async function(req, res){
        let bucketFileName, fileUpdateStatus = false, fileList;
    if (req.file) {
        bucketFileName = req.file.key;
    }
    let datemodified = new Date().toLocaleString()
       try{
           console.log(req.body)
          let{fileid, userid,filename,filedesc, previousFileName} = req.body;
          let conn = await dbConnPool.getConnection();
          fileList= await conn.query("UPDATE file_schema.files SET filename=?,filedescription=?,datemodified=?,bucketFileName=? WHERE fileid=?", 
          [filename, filedesc,datemodified,bucketFileName, fileid]) 
         message = "File update is successful"
         fileUpdateStatus = true

         var params = {
            Bucket: 'bucket-files3',
            Key: previousFileName
        };
         s3.deleteObject(params, async function (err, data) {
            if (data) {
              console.log(data);
              fileDelStatus = true
            }
            else {
                console.log("Check if you have sufficient permissions : "+err);
            }
        });
       } catch(e){
           console.log(e)
      
       } finally{
          res.status(200).json({
              status:fileUpdateStatus,
              fileList
          });
          }
        });


module.exports = router;