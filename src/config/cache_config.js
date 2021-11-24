const NodeCache = require("node-cache");
const cacheConfig = new NodeCache({
	stdTTL: 0,
	maxKeys: -1 // allow unlimited keys to store
});

module.exports = cacheConfig;
