/**
 * @namespace db
 *  @description This file holds the functions responsible to invoke the required db connection
 *  @author Mayank Jariwala 
 */

const process = require("process");
const mongo_connection = require("./mongo/connection");
const loggers = require("src/utils/loggers");
require("custom-env").env(process.env.NODE_ENV);

/**
 *  The db_instance holds the instance of the registered db into the geolocation service
 * @type {{mongo: {instance: null, status: undefined}, redis: {instance: null, status: undefined}}}
 */
const db_instance = {
	mongo: {
		inProcess: false,
		status: undefined,
		instance: null
	}
};

/**
 * This configuration object basically invokes the respective db connection function for
 * setting up the connection with the db based on the instance object whether it is null or not
 * null
 *
 * @type {{mongo: (*|*)}}
 */
const configuration = {
	get dbInstance() {
		return db_instance;
	},
	get mongo() {
		if (db_instance.mongo.instance == null && db_instance.mongo.inProcess === false) {
			db_instance.mongo.inProcess = true;
			mongo_connection.getMongoInstance().then(value => {
				db_instance.mongo.instance = value;
				db_instance.mongo.status = true;
			}).catch(reason => {
				loggers.exception(__filename, `Mongo Configuration Setup failed with the exception: ${reason}`);
				db_instance.mongo.status = false;
			});
			return db_instance.mongo;
		} else {
			return db_instance.mongo;
		}
	}
};


/**
 * Connection to Mongo and if connected return true
 * @returns {boolean}
 */
const connect_mongo = () => {
	if (configuration.dbInstance.mongo.status === false) {
		loggers.log(__filename, "Mongo Connection Failed");
		process.exit();
	} else if (configuration.dbInstance.mongo.status === true) {
		return true;
	}
	if (configuration.dbInstance.mongo.instance === null) {
		configuration.mongo;
	}
};


module.exports = {
	db_instance,
	connect_mongo
};
