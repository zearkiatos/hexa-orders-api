export default {
    DEBUG: process.env.DEBUG === 'true',
    LOG_LEVEL: process.env.LOG_LEVEL,
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: parseInt(process.env.PORT, 10) || '5000',
    METRICS_PREFIX: process.env.METRICS_PREFIX,
    NAME: process.env.NAME,
  }
  