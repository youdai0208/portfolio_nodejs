'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// 指定したポート番号で接続をlistenする
// app.listen(PORT, HOST);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Start server port:${port}`);
})

// console.log(`Running on http://${HOST}:${PORT}`);