const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


// Middleware to validate token

employeeSchema.methods.generateAuthToken = async function () {
    try {
        const employee = this;
        const token = jwt.sign({ _id: employee._id.toString() }, process.env.SECRET_KEY, { expiresIn: 3600 });
        employee.tokens = employee.tokens.concat({ token: token });
        await employee.save();
        return token;
    } catch (e) { 
        console.log(e);
    }

};


// Middleware to hash password before saving

employeeSchema.pre('save', async function () {
    try {
        const employee = this;
        if (employee.isModified('password')) {
            employee.password = await bcrypt.hash(employee.password, 10);
        }
        
        await employee.save();
        
        next();
    } catch (e) {
        console.log(e);
     }

});




// Creating collections
const Register = mongoose.model('Employee', employeeSchema);


module.exports = Register;