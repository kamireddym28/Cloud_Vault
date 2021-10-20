const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const fs   = require('fs');
const zip = require('gulp-zip');
const log = require('fancy-log');
const path = require('path');
var exec = require('child_process').exec;

const PROD_PATH = path.resolve('../prod_build');
const SERV_PATH = path.resolve('../node-express');

const paths = {
  prod_build: PROD_PATH,
  serv_src: `${SERV_PATH}/server.js`,
  serv_cfg: `${SERV_PATH}/config.json`,
  react_src: `./build/**/*`,
  react_dist: `${PROD_PATH}/react-view/build`,
  zipped_file_name: 'react-nodejs.zip'
};

function clean()  {
  log('removing the old files in the directory')
  return del(`${paths.prod_build}/*`, {force:true});
}

function createProdBuildFolder() {

  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`)
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log('📁  folder created:', dir);
  }

  return Promise.resolve('the value is ignored');
}

function buildReactCodeTask(cb) {
  log('building React code into the directory')
  return exec(`npm run build`, function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  })
}

function copyReactCodeTask() {
  log('copying React code into the directory')
  return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

function buildNodeJSCodeTask(cb) {
  log('building server code in the directory')
  return exec(`cd ${SERV_PATH} && npm run build`, function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  });
}

function copyNodeJSCodeTask() {
  log('copying server code into the directory')
  return src(`${paths.serv_src}`)
        .pipe(dest(`${paths.prod_build}`))
}

function copyNodeJSConfigTask() {
  log('copying server config into the directory')
  return src(`${paths.serv_cfg}`)
        .pipe(dest(`${paths.prod_build}`))
}

function zippingTask() {
  log('zipping the code ')
  return src(`${paths.prod_build}/**`)
      .pipe(zip(`${paths.zipped_file_name}`))
      .pipe(dest(`${paths.prod_build}`))
}

exports.default = series(
  clean,
  createProdBuildFolder,
  buildReactCodeTask,
  copyReactCodeTask,
  buildNodeJSCodeTask,
  copyNodeJSCodeTask,
  copyNodeJSConfigTask,
  zippingTask
);