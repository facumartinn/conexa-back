const Users = require('../models/Users');

module.exports = class UserService {

    static async createUser(data) {
        try {
            const newUser = {
                username: data.username,
                password: data.password
            }
            // Guardo nuevo usuario
            const response = await new Users(newUser).save();
            return response;

        } catch (error) {
            console.log(error);
        } 
    }

    static async getUser(data) {
        try {
            // Busco usuario para login
            const loggedUser = await Users.findOne(data);
            
            return loggedUser;
        } catch (error) {
            console.log(`Could not find user. ${error}`)
        }
    }
}