const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'comonSecret')
        const userData = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!userData) {
            throw new Error();
        } else {
            req.token = token;
            req.user = userData;
            next();
        }

    } catch (error) {
        res.status(401).send({ 'error': 'Please Authenticate' })
    }
}

module.exports = auth;
