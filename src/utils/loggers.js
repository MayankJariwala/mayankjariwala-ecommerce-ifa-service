/**
 * @namespace utils
 *  @description This file is use to hold logs related functions
 *  @author Mayank Jariwala 
 */

const process = require("process");
const fs = require("fs");

require("custom-env").env(process.env.NODE_ENV);

/**
 *
 * @constructor
 */
function Loggers() {

}

const date = new Date();
const loggers = new Loggers();

function get_file_name(file_path) {
		try {
				const file_name = file_path.split("/");
				return file_name[file_name.length - 1];
		} catch (e) {
				return file_path;
		}
}

Loggers.prototype.log = function (message, layer = __filename) {
		console.log(`[${get_file_name(layer)}] [${date.toISOString()}] ${message}`);
};

Loggers.prototype.error = function (message, layer = __filename) {
		console.error(`[${get_file_name(layer)}] [${date.toISOString()}] ${message}`);
};

Loggers.prototype.exception = function (message, layer = __filename) {
		console.warn(`[${get_file_name(layer)}] [${date.toISOString()}] ${message}`);
};

Loggers.prototype.debug = function (message, layer = __filename) {
		console.debug(`[${get_file_name(layer)}] [${date.toISOString()}] ${message}`);
};

Loggers.prototype.warn = function (message, layer = __filename) {
		console.warn(`[${get_file_name(layer)}] [${date.toISOString()}] ${message}`);
};

Loggers.prototype.connectionStatus = function (mongo_status_flag) {
		console.table([
				{
						"Mongo (Connection Status)": process.env.MONGO_ENABLED === "true" ? mongo_status_flag : "skip"
				}
		]);
};

Loggers.prototype.writeToFile = function (message, received_message) {
		const format_message = `[${new Date().toUTCString()}] Mail response message: ${message.toString()} with received_message ${received_message}\n`;
		fs.appendFile("src/mail_logs.txt", format_message, function (err) {
				if (err) throw err;
				console.log("Saved!");
		});
};

module.exports = loggers;
