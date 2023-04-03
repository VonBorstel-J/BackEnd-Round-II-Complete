const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('./config/server.key'),
  cert: fs.readFileSync('./config/server.cert')
};

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

https.createServer(options, app)
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  // const logger = (req, res, next) => {
  //   console.log(`Request received at ${new Date()}`);
  //   next();
  // };
  
  // module.exports = logger;