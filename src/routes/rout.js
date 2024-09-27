const express = require('express');
const Register = require('../models/uregister');
const rout = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

rout.get('/', async (req, res) => {
    try {
        res.render('register');
    } catch (e) {
        console.log(e);
    }
});

rout.post('/register', async (req, res) => {
    try {
        const user = new Register({
            email: req.body.email,
            password: req.body.pswd
        });

        const token = await user.generateAuthToken();

        res.cookie('jwt', token);

        const newUser = await user.save();
        console.log(newUser);

        res.status(200).render('login');
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});

rout.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.pswd;

        const user = await Register.findOne({ email: email });
        const pas = await bcrypt.compare(password, user.password);

        if (pas) {
            const token = await user.generateAuthToken();
            res.cookie('login_cookie', token);
            res.status(200).render('home');
        }
        else {
            res.status(400).json({ error: 'Invalid credentials' });
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Server error' });
    }
})


rout.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((indexElement) => {
            return indexElement.token !== req.token;
        });

        res.clearCookie('login_cookie');
        await req.user.save();

        res.status(200).render('login');
    } catch (e) { }
    res.clearCookie('login_cookie');
    res.status(200).render('login');
})


module.exports = rout;