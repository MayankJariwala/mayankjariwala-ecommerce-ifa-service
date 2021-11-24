const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

	constructor(name, message) {
		super(message);
		this.name = name;
	}
}


class UnauthorizedException extends Exception {
	constructor(message = "Unauthorized Access", stack = {}) {
		super("RecordNotFoundException", message);
		this.message = message;
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.UNAUTHORIZED)
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
	UnauthorizedException
};
