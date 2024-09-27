require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const path = require('path');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const rout = require('./routes/rout');
const hbs = require('hbs');


app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(rout);


// Paths
const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


hbs.registerPartials(partialsPath);


app.use(express.static(staticPath));


app.set('view engine', 'hbs');
app.set('views', dynamicPath);


app.listen(port, async (req, res) => {
    console.log(`Server running at http://localhost:${port}`);
})