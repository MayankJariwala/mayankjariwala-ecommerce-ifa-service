const cacheConfig = require("src/config/cache_config");
const loggers = require("src/utils/loggers");

/**
 *
 * @constructor
 */
function InMemoryCacheService() {
}

const node_cache_instance = new InMemoryCacheService();

InMemoryCacheService.prototype.set = function (key, value, ttl = 0) {
	const cache_set_status =  cacheConfig.set(key, value, ttl);
	loggers.log(__filename, `Cache value is set with status ${cache_set_status}`);
};

InMemoryCacheService.prototype.get = function (key) {
	const value = cacheConfig.get(key);
	if (value === undefined) {
		return undefined;
	}
	return value;
};

InMemoryCacheService.prototype.remove = function (key) {
	const count = cacheConfig.del(key);
	return count > 0;
};

InMemoryCacheService.prototype.getAllKeys = function () {
	return cacheConfig.keys();
};

InMemoryCacheService.prototype.keyExists = function (key) {
	return cacheConfig.has(key);
};

InMemoryCacheService.prototype.getAndDelete = function (key) {
	const value = cacheConfig.take(key);
	if (value === undefined) {
		return undefined;
	}
	return value;
};

InMemoryCacheService.prototype.multipleSet = function (objects = [], config = undefined) {
	if (objects === [])
		return undefined;

	if (config === undefined) {
		config = {
			stdTTL: 2000,
			deleteOnExpire: true
		};
	}
	return cacheConfig.mset(objects);
};

InMemoryCacheService.prototype.clearAll = function () {
	cacheConfig.flushAll();
};

module.exports = node_cache_instance;
