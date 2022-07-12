const { createServer } = require('http');
const app = require('./src/app');
const {PORT} = require('./src/common/config');
const {logger} = require('./src/common/utils');

//start server
const server = createServer(app);
server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.log({
        level: 'error',
        message: err.message,
    });
    //close server & exit
    logger.info('Shutting down due to uncaught exception');
    server.close(() => process.exit(1));
});