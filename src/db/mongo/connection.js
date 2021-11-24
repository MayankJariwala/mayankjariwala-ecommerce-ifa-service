/**
 * @namespace db
 *  @description This file holds the functions responsible to initiate the mongodb connection
 *  @author Mayank Jariwala 
 */

const process = require("process");
const mongoose = require("mongoose");
require("custom-env").env(process.env.NODE_ENV);
const loggers = require("src/utils/loggers");

/**
 *
 * @constructor
 */
function MongoConnection() {

}

const mongo_connection = new MongoConnection();

MongoConnection.prototype.connect = async function () {
		try {
				// const credentials = fs.readFileSync(process.env.MONGO_CERT_PATH);
				const response = await mongoose.connect(process.env.MONGO_URI, {
						useNewUrlParser: true,
						useUnifiedTopology: true
				});
				loggers.log(__filename, `Connected to the db version: ${response.version}`);
				const mongoConnection = mongoose.connection;
				mongoConnection.on("error", function (err) {
						loggers.error(__filename, `Mongo Connection error: ${err}`);
				});
				mongoConnection.once("open", function () {
						loggers.log(__filename, "Connected to db");
				});
				return mongoConnection;
		} catch (e) {
				loggers.log(__filename, `Mongo Connection failed with the exception: ${e}`);
				throw e;
		}
};

MongoConnection.prototype.getMongoInstance = async function () {
		return await mongo_connection.connect();
};

MongoConnection.prototype.disconnect = async function () {
		return await mongo_connection.disconnect();
};

module.exports = mongo_connection;
