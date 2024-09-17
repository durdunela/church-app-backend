const express = require('express');
const body_parser = require('body-parser');
const userRoute = require('./routers/user.router');

const app = express();
const cors = require('cors');


app.use(body_parser.json());

app.use('/', userRoute);

app.use(cors());


module.exports = app;