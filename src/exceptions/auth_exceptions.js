const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

	constructor(name, message) {
		super(message);
		this.name = name;
	}

}


class CredentialsFailedException extends Exception {
	constructor(message = "Email or Password is not correct", stack = {}) {
		super("CredentialsFailedException", message);
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

class UserNotFoundException extends Exception {

	constructor(message = "User not found", stack = {}) {
		super("UserNotFoundException", message);
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

class EmailAlreadyExists extends Exception {

	constructor(message = "Email address is already been taken", stack = {}) {
		super("UserNotFoundException", message);
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.FOUND)
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


class UserNotApprovedException extends Exception {

	constructor(message = "User Account is not approved", stack = {}) {
		super("UserNotApprovedException", message);
		this.message = message;
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.FORBIDDEN)
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

class UserAccountSuspendedException extends Exception {

	constructor(message = "Your account is inactivated", stack = {}) {
		super("UserNotApprovedException", message);
		this.message = message;
	}

	sendAppResponse = (response_instance) => {
		return response_instance
			.status(STATUS_CODES.FORBIDDEN)
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
	UserNotFoundException,
	EmailAlreadyExists,
	UserAccountSuspendedException,
	CredentialsFailedException,
	UserNotApprovedException
};
