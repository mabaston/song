const pino = require('pino');
const pinoLogger = require('pino-http');
const { randomUUID } = require('node:crypto');
const logger = pinoLogger({
    logger: pino(),
    genReqId: function (req, res) {
        const existingID = req.id ?? req.headers["x-request-id"]
        if (existingID) return existingID
        const id = randomUUID()
        res.setHeader('X-Request-Id', id)
        return id
    }
});

module.exports = logger;