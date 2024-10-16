require('dotenv').config();
require('express-namespace');
require('module-alias/register');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

require('./src/routes/auth.route')(app);
app.namespace('/api', function(){
    require('@routes/system.route')(app);
    require('@routes/process.route')(app);
});

app.listen(process.env.PORT, function(){
    console.log("started on port", process.env.PORT)
});