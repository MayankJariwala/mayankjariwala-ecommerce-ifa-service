const response_payload = function (code, message, description = null, data = null) {
    return {
        code: code,
        message: message,
        description: description,
        data: data
    }
};

module.exports = {
    response_payload
};
