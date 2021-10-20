var express = require('express');
var router = express.Router();
var aws      =require('aws-sdk');
var multer   =require('multer');
var multers3 =require('multer-s3');
const dbConnPool = require("../connectionUtils");

router.get("/fetchUserFiles", async function(req, res){
  let fileFetchStatus = false, fileList
 try{
     console.log(req.query)
    let{userid} = req.query;
    console.log("user id...", userid)
    let conn = await dbConnPool.getConnection();
    fileList= await conn.query("SELECT * FROM file_schema.files WHERE userid=?", [userid]) 
    
   uploadStatus = true
   message = "File upload is successful"
   fileFetchStatus = true
 } catch(e){
     console.log(e)

 } finally{
    res.status(200).json({
        status:fileFetchStatus,
        fileList
    });
    }
  });

  router.get("/fetchAdminFiles", async function(req, res){
    let fileFetchStatus = false, fileList
   try{
       console.log(req.body)
      let{userid} = req.body;
      let conn = await dbConnPool.getConnection();
      fileList= await conn.query("SELECT * FROM file_schema.files") 
      
     uploadStatus = true
     message = "File upload is successful"
     fileFetchStatus = true
   } catch(e){
       console.log(e)
  
   } finally{
      res.status(200).json({
          status:fileFetchStatus,
          fileList
      });
      }
    });
  
    
    
  
module.exports = router;