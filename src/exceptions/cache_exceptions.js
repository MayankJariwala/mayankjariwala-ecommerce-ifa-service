const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

	constructor(name, message) {
		super(message);
		this.name = name;
	}
}


class CacheSetException extends Exception {
	constructor(message = "Failed to set value in cache", stack = {}) {
		super("RecordNotFoundException", message);
		this.message = message;
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.BAD_REQUEST)
			.json({
				status: SEVERITY_LEVEL.EXCEPTION,
				exception: this.constructor.name,
				message: this.message
			});
	};

	dump_response = () => {
		loggers.log(__filename, this.stack);
	};
}

// specific exception
class CacheGetException extends Exception {
	constructor(message = "Cannot find value in cache", stack = {}) {
		super("RecordNotFoundException", message);
		this.message = message;
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.BAD_REQUEST)
			.json({
				status: SEVERITY_LEVEL.EXCEPTION,
				exception: this.constructor.name,
				message: this.message
			});
	};

	dump_response = () => {
		loggers.log(__filename, this.stack);
	};
}


module.exports = {
	CacheSetException,
	CacheGetException
};
