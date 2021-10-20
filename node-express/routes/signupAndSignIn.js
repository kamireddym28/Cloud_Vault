var express = require('express');
var router = express.Router();
const dbConnPool = require("../connectionUtils");


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/serversignup", async function(req, res){
  let{email, password, fname, lname} = req.body;
  var signupStatus= false, message="Sign up is not successful";
  console.log("In signup user route..");
  try {
      let userDetails = {
          first_name : fname,
          last_name: lname,
          email : email,
          password : password
      };
      console.log(userDetails);
      let conn = await dbConnPool.getConnection();
      let result = await conn.query("INSERT INTO file_schema.Users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", 
          [fname, lname, email, password])
          await conn.query('COMMIT')
          signupStatus = true
          message = "User Signed up successfully"
  } catch(e) {
      console.log(e);
      signupStatus = false;
  } finally{
      res.status(200).json({
          status:signupStatus,
          message: message
      });
  }
});

router.post("/serversignin", async function(req, res){
    console.log("in signin route..");
    console.log(req.body);
    let {email, password}  = req.body;
    console.log("In signin dbaccess..");
    let conn = await dbConnPool.getConnection();
    let signinStatus = false, message = "SignIn Failed", userid="nil"
    try{
        let result = await conn.query("SELECT * FROM file_schema.Users WHERE email=?", [email])
        let responseObj={}
        if(result.length >0){
            if(result[0].password == password){
                signinStatus = true
                message="SignIn Successful"
                userid=result[0]['userid']
                console.log("userid.."+userid)
            } else {
                message="Invalid Email or Password"
            }
        }
        responseObj.status = signinStatus
        responseObj.message = message
   }catch(e){
        console.log(e);
    }
    finally{
     console.log("status and message.."+signinStatus+"...."+message)
     res.status(200).json({
        status:signinStatus,
        message,
        "userid":userid
    });
    }
});

module.exports = router;