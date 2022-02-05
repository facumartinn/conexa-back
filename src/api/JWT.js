const {sign, verify} = require('jsonwebtoken');
require('dotenv').config();

const createTokens = (user) => {
    const accessToken = sign(
        {username: user.username, id: user.id}, 
        process.env.SECRET_KEY
    );
    return accessToken;
}


const validateToken = (req, res, next) => {
    
    const accessToken = req.cookies.logintoken;
    // console.log(accessToken)
    if (!accessToken) return res.status(400).json({error: "User not authenticated."})

    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        if (validToken) {
            req.authenticated = true;
            next();
        }
    } catch (error) {
        // console.log('aqui');
        return res.status(400).json({error: error})
    }
}

module.exports = { createTokens, validateToken };