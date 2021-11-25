const {STATUS_CODES, SEVERITY_LEVEL} = require("src/network/http_reference_list");
const loggers = require("src/utils/loggers");

class Exception extends Error {

		constructor(name, message) {
				super(message);
				this.name = name;
		}
}


class RecordNotFoundException extends Exception {
		constructor(message = "No Record Present", stack = {}) {
				super("RecordNotFoundException", message);
				this.message = message;
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

// specific exception
class ProductLinkedToCategoryException extends Exception {
		constructor(message = "Products are linked to this category", stack = {}) {
				super("ProductLinkedToCategoryException", message);
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
		RecordNotFoundException,
		ProductLinkedToCategoryException
};
