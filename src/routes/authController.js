const { Router } = require('express');
const cors = require('cors')
const corsOptions = require('../config/corsOptions')

const router = Router();

/* const User = require('../models/User');*/
const verifyToken = require('../controllers/verifyToken')
const bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken');
const { config } = require('../config');

const UserService = require('../services/users');
const mongoConnection = new UserService()

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


//router.post('/singup', cors(corsOptions), async (req, res) => {
router.post('/singup', cors(), async (req, res) => {
    try {
        // Receiving Data
        let { name, username, password, email, type } = req.body;
        password = await encryptPassword(password)
        // Creating a new User
        const user = await mongoConnection.createUser({
            name,
            username,
            password,
            email,
            type
        })


        // Create a Token
        const token = jwt.sign({ id: user }, config.secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        console.log('Registro????')
        res.json({ auth: true, token });

    } catch (e) {
        console.log(e)
        res.status(500).send('There was a problem registering your user');
    }
});

router.post('/me', verifyToken, async (req, res) => {
    // res.status(200).send(decoded);
    // Search the Info base on the ID
    // const user = await User.findById(decoded.id, { password: 0});
    const user = await mongoConnection.getUser(req.userId);
    if (!user) {
        return res.status(404).send("No user found.");
    }
    res.status(200).json(user);
});

router.post('/singin', async (req, res) => {
    const user = await mongoConnection.getUserByUsername(req.body.username)
    console.log("El usuario que viene ", user)
    if (Object.keys(user).length === 0) {
        return res.status(404).send("The email doesn't exists")
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(401).send({ auth: false, token: null });
    }
    const userType= user.type
    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60 * 60 * 24
    });
    res.status(200).json({ auth: true, token, userType });
});

router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;