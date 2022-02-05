const axios = require('axios');
const bcrypt = require('bcrypt');
const { createTokens } = require('./JWT');
const users = require('../database/Users.json');
const UserService = require('../services/user.service');

axios.defaults.withCredentials = true;

module.exports = class controller {

    static async registration(req, res) {

        const {username, password} = req.body;
        const user = users.find(user => user.username === username);

        try {
                if (!user) {
                    // Hash de password para guardar en base de datos
                    const hashedPassword = await bcrypt.hash(password, 10);
                    // Creacion de user nuevo
                    UserService.createUser(users, {username: username, password: hashedPassword});
        
                    res.status(200).json({message: "User created!"});
        
                } else {
                    res.status(400).json({error: "User already exists."})
                }
        } catch (error) {
                res.status(500).json({error: error});
        }
    }
    
    static async login(req, res) {

        const {username, password} = req.body;
        // Busco si existe el user
        const user = users.find(user => user.username === username);

        try {
                if (user) {
                    // Comparo la password del body con la que esta guardada en la base
                    const matchPasswords = await bcrypt.compare(password, user.password);
                    // Si matchean, se loguea
                    if (matchPasswords) {

                        const loginToken = createTokens(user);
                        // res.status(200).json({"login-token": loginToken});
                        res.cookie("logintoken", loginToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
                        res.status(200).json({message: "Logged in!"});
                    } else {
                        res.status(400).json({error: "Wrong username and/or password."});
                    }
        
                } else {
                    res.status(400).json({error: "User not registered."})
                }
            
        } catch (error) {
            res.status(400).json({error: error});
        }

    }

    static async logout(req, res) {
        res.cookie("logintoken", "", {maxAge: 1});
        res.status(200).json({"message": "User logged out."});
    }

    static async getPosts(req, res) {
        // https://jsonplaceholder.typicode.com/posts
        
        
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            return res.json(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    static async getPhotos(req, res) {
        // https://jsonplaceholder.typicode.com/photos
        // https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10');
            // console.log(response.data)
            return res.json(response.data);
        } catch (error) {
            // console.log("error")
            console.error(error);
        }

    }
}
