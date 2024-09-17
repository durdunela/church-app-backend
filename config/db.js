const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/ChurchApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('open', () => {
    console.log("MongoDB connected");
});

connection.on('error', (error) => {
    console.error("MongoDB connection error:", error);
});

module.exports = connection;
