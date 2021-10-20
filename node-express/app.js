var express = require('express');
var path = require('path');
var aws = require('aws-sdk');
var app = express();
var cors = require('cors');
var conUtils = require('./connectionUtils.js')
var signupAndSignIn = require('./routes/signupAndSignIn');
var Uploadfile = require('./routes/Uploadfile')
var fetchFiles = require('./routes/fetchFiles')
var config = require('./config.json')

function loadAWSConfig() {
  aws.config.update({
    ...config,
    signatureVersion: 'v4',
  });
}

loadAWSConfig();

app.use(express.json());

const reactAppPath = path.join(__dirname, '/react-view/build');
app.use(express.static(reactAppPath));
app.set('views', path.join(__dirname, 'views'));

const serveReact = (req, res) => {
  res.sendFile(path.join(reactAppPath, 'index.html'));
}

app.get('/userdashboard', serveReact);
app.get('/usersignin', serveReact);
app.get('/usersignup', serveReact);
app.get('/fileupload', serveReact);
app.get('/updatefile', serveReact);
app.get('/admindashboard', serveReact);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//Allow Access Control
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function (req, res, next) {
var allowedOrigins = ['http://cloud-vault-dev.us-east-2.elasticbeanstalk.com/', 'http://localhost:3000']; 
      var origin = req.headers.origin;  
       if(allowedOrigins.indexOf(origin) > -1){
               res.setHeader('Access-Control-Allow-Origin', origin);
          }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Origin,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//start your server on port 8080
const port = process.env.PORT || 8080;
app.listen(port);
console.log("Server Listening on port ", port);

app.use("/", signupAndSignIn);
app.use("/", Uploadfile);
app.use("/", fetchFiles);

module.exports = app;