var winston = require('winston');

// thin wrapper for initialized winston instance
var winstonOpts = {
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
      timestamp: true
    })
  ]
};
var logger = new winston.Logger(winstonOpts);

module.exports = logger;
