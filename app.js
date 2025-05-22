/*
const http = require("http");

const newserver = http.createServer((req,res) => {
    res.write("Welcome to our server")
    res.end();
})


newserver.listen (3000, () => {
    console.log("Your server is ready and listening")
})
*/


// dual-server.js

const http = require('http');
const express = require('express');

// http server 

const rawServerPort = 3000;

const rawServer = http.createServer((req, res) => {
  const routes = {
    '/': '<h2 style="color:teal;">[HTTP] Home Page</h2><p>Welcome to the raw server</p>',
    '/login': '<h2 style="color:orange;">[HTTP] Login Page</h2><p>Enter your credentials</p>',
  };

  res.writeHead(routes[req.url] ? 200 : 404, { 'Content-Type': 'text/html' });
  res.end(
    routes[req.url] || '<h2 style="color:red;">404 - Not Found</h2><p>Try / or /login</p>'
  );
});

rawServer.listen(rawServerPort, () => {
  console.log(`🛠️  HTTP server (raw) running at http://localhost:${rawServerPort}`);
});

// express server


const app = express();
const expressPort = 4000;

const renderPage = (title, message, color) =>
  `<h2 style="color:${color};">[Express] ${title}</h2><p>${message}</p>`;

app.get('/', (req, res) => {
  res.send(renderPage('Home Page', 'Welcome to the Express server', 'green'));
});

app.get('/login', (req, res) => {
  res.send(renderPage('Login Page', 'Please sign in to continue', 'blue'));
});

app.use((req, res) => {
  res.status(404).send(renderPage('404', 'This route does not exist', 'crimson'));
});

app.listen(expressPort, () => {
  console.log(`⚡ Express server running at http://localhost:${expressPort}`);
});
 
