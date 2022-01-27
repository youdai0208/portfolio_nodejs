'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./router");

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Start server port:${port}`);
});