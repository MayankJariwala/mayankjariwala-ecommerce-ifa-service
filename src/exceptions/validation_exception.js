const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

		constructor(name, message) {
				super(message);
				this.name = name;
		}
}

class EmailInvalidException extends Exception {

		constructor(message = "Email is invalid", stack = {}) {
				super("EmailInvalidException", message);
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

class InvalidNumberException extends Exception {

		constructor(message = "Required a number", stack = {}) {
				super("EmailInvalidException", message);
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

class EmptyFieldException extends Exception {

		constructor(message = "Field cannot be empty", stack = {}) {
				super("EmptyFieldException", message);
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

class PasswordNotMatchException extends Exception {

		constructor(message = "Field does not match", stack = {}) {
				super("PasswordNotMatchException", message);
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

class GeneralValidationException extends Exception {

		constructor(message = "Field does not match", stack = {}) {
				super("GeneralValidationException", message);
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
		EmailInvalidException,
		EmptyFieldException,
		InvalidNumberException,
		GeneralValidationException,
		PasswordNotMatchException
};
