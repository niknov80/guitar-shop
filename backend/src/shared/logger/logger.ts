import pino from 'pino';

const PRETTY_LOGGER_TARGET = 'pino-pretty';
const ENABLE_COLORIZE = true;
const TIME_FORMAT = 'SYS:standard';

/**
 * Pino-логгер, настроенный с цветной консолью и форматированием времени.
 */
const logger = pino({
  transport: {
    target: PRETTY_LOGGER_TARGET,
    options: {
      colorize: ENABLE_COLORIZE,
      translateTime: TIME_FORMAT,
    },
  },
});

export default logger;
