import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import services from './services';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import '@feathersjs/transport-commons';
import path from 'path';

import knex from './knex';

const PORT = process.env.PORT || 3030;

// Create a Feathers application
const app = express(feathers());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Configure the Socket.io transport
app.configure(socketio());

// Create a channel that will handle the transportation of all realtime events
app.on('connection', connection => app.channel('everybody').join(connection));

// Publish all realtime events to the `everybody` channel
app.publish(() => app.channel('everybody'));

console.log("configuration");
console.dir(configuration()());

app.configure(configuration());

app.configure(knex);

app.configure(services);

// Start the server on port 3030
//@ts-ignore
app.listen(PORT);
console.log('listening on port '+PORT);
