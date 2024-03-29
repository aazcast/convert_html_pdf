const express = require('express');
const pjson = require('../package.json');

//Routes List
const functionsRoute = require('./functions.route');

//Url start
const v1 = '/api/v1/';

module.exports = (app) => {

  //Base Route
  app.get('/', (req, res) => {
    res.send(`Hello, you should not be here. GRV v${pjson.version}`);
  });

  //Verify API is Working
  app.get('/api/v1/verify', (req, res) => {
    res.send(`Api is Working Fine GRV v${pjson.version}`);
  });

  //Auth Validation Routes
  app.use(`${v1}`, functionsRoute);
};