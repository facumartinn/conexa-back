const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model("Collections", UserSchema, "Users");