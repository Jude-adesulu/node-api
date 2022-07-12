const { createLogger, transports } = require('winston');
const RotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
    level: 'info',
    transports: [ new transports.Console() ],
});

logger.configure({
    level: 'verbose',
    transports: [
        new RotateFile({
            dirname: '/logs',
            filename: 'app.logs',
            datePattern: 'yyyy-MM-DD',
            json: false,
            level: 'info'
        }),
        new RotateFile({
            dirname: '/logs',
            filename: 'error.log',
            datePattern: 'yyyy-MM-D',
            json: false,
            level: 'error',
          }),
    ],
});

module.exports = { logger };