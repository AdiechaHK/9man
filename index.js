const PORT = 3000;

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bootstrap = require('./bootstrap');

/* Bootstraping Application */
bootstrap.bootstrapApp(app, express);
bootstrap.setRoutes(app);
bootstrap.initSocket(http);
bootstrap.startServer(http, PORT);

