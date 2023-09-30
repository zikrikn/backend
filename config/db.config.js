const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {

    const url = process.env.MONGO_CONNECTION_STRING;
    logger.info("process.env.MONGO_CONNECTION_STRING :::" + process.env.MONGO_CONNECTION_STRING);

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Use this instead of useUnifiedTopology
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
    });
}

const disconnect = () => {

    if (!mongoose.connection) {
      return;
    }

    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Disconnected from database");
    });

};

module.exports = {
    connect,
    disconnect
}
