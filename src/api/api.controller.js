const axios = require('axios');
const bcrypt = require('bcrypt');
const { createTokens } = require('./JWT');
const UserService = require('../services/user.service');
axios.defaults.withCredentials = true;


module.exports = class controller {

    static async registration(req, res) {
        try {
            const loggedUser = req.body;
            // Busco si ya existe usuario
            const user = await UserService.getUser({username: loggedUser.username});
                if (!user) {

                    // Hash de password para guardar en base de datos
                    const hashedPassword = await bcrypt.hash(loggedUser.password, 10);
                    // Creacion de user nuevo
                    UserService.createUser({username: loggedUser.username, password: hashedPassword});
        
                    res.status(200).json({message: "User created!"});
                } else {
                    res.status(400).json({error: "User already exists."})
                }
        } catch (error) {
                res.status(500).json({error: error});
        }
    }
    
    static async login(req, res) {
        try {
            const loggedUser = req.body;
            // Busco usuario
            const user = await UserService.getUser({username: loggedUser.username});
            // console.log(user);

                if (user) {

                    // Validacion password
                    const matchPasswords = await bcrypt.compare(loggedUser.password, user.password);

                    // Si matchean, se loguea
                    if (matchPasswords) {

                        // Creo JWToken
                        const loginToken = createTokens(user);

                        // Se crea la cookie con el JWToken
                        res.setHeader('set-cookie', `logintoken=${loginToken}; SameSite=None; Secure; max-age=31557600`)
                           .status(200).json({message: "Logged in!"});

                    } else {
                        res.status(400).json({error: "Wrong username and/or password."});
                    }
        
                } else {
                    res.status(400).json({error: "User not registered."});
                }
            
        } catch (error) {
            res.status(400).json({error: error});
        }

    }

    static async logout(req, res) {

        // Borro la cookie con el JWToken
        res.cookie("logintoken", "", {maxAge: 1})
           .status(200).json({"message": "User logged out."});
    }

    static async getPosts(req, res) {
        // https://jsonplaceholder.typicode.com/posts
        try {
            // Request a la api para obtener la data
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            return res.json(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    static async getPhotos(req, res) {
        // https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10
        try {
            // Request a la api para obtener la data
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10');
            return res.json(response.data);
        } catch (error) {
            console.error(error);
        }

    }
}
