import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import services from './services';
import configuration from '@feathersjs/configuration';

import bodyParser from 'body-parser';


import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';

import express from '@feathersjs/express';
import '@feathersjs/transport-commons';
import path from 'path';

import knex from './knex';
import authentication from './authentication';

const PORT = process.env.PORT || 3030;


// Create a Feathers application
const app = express(feathers());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configure the Socket.io transport
app.configure(socketio());

// Create a channel that will handle the transportation of all realtime events
app.on('connection', connection => app.channel('everybody').join(connection));

// Publish all realtime events to the `everybody` channel
app.publish(() => app.channel('everybody'));

app.configure(configuration());

app.configure(knex);

app.configure(services);

app.configure(authentication);

// Start the server on port 3030
app.listen(PORT);
console.log('listening on port ' + PORT);
