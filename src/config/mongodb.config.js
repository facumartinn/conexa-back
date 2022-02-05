require('dotenv').config();
const mongoose = require('mongoose');

// mongoose options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
};

// mongodb environment variables
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PASS,
    MONGO_USER
} = process.env;

const dbConnectionURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(dbConnectionURL, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL));
db.once('open', () => {
     // we're connected !
    console.log('Mongodb Connection Successful');
});

module.exports = db;