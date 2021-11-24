const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

	constructor(name, message) {
		super(message);
		this.name = name;
	}
}

class InvalidRequestException extends Exception {

	constructor(message, stack = {}) {
		super("InvalidNumberException", message);
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

class InvalidBidDecisionException extends Exception {

	constructor(message = "No such kind of decision exists in the system", stack = {}) {
		super("InvalidBidDecisionException", message);
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.NOT_FOUND)
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
	InvalidRequestException,
	InvalidBidDecisionException
};
