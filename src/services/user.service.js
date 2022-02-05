const fs = require('fs');
const path = require('path');

module.exports = class UserService {

    static async createUser(users, newUser) {
        
        try {
            // Push a nuevo user en lista de users
            users.push(newUser);
            const userss = users.map((user, i) => {
                return ({
                    id: i,
                    ...user
                })
            })
            const newUserList = JSON.stringify(userss, null, 2);
            const finished = (error) => {
                if (error) return;
            }
            // Agrego nuevo usuario a Users.json
            fs.writeFile(path.resolve('./src/database/Users.json'), newUserList, finished);

        } catch (error) {
            console.log(error);
        } 
    }
}