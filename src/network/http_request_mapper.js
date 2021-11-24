/**
 * TODO: What this layer represents?
 * @description

 * @author Venkatesh
 * @type {{STATUS_CODES, HTTP_METHODS}|*}
 */

const HTTP_METHODS = require("src/network/http_reference_list");
const fetch = require("node-fetch");

/**
 *
 * @constructor
 */
function HttpRequestWrapper() {

}

const http_request_mapper = new HttpRequestWrapper();

HttpRequestWrapper.prototype.get = async (headers = {}, url = "") => {
    return await fetch(url, {
        method: HTTP_METHODS.HTTP_METHODS.GET,
        headers: headers || {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    });
};

HttpRequestWrapper.prototype.post = async (headers = {}, url = "", body) => {
    return await fetch(url, {
        method: HTTP_METHODS.HTTP_METHODS.POST,
        headers: headers || {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(body)
    });
};

HttpRequestWrapper.prototype.delete = async (headers = {}, url = "") => {
    return await fetch(url, {
        method: HTTP_METHODS.HTTP_METHODS.DELETE,
        headers: headers || {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    });
};

module.exports = http_request_mapper;
