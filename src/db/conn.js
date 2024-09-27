const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bismy_db').
then(()=>{
    console.log('Connected to MongoDB...');
}).catch(err => console.log('Error connecting to MongoDB'));