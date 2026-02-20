import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${ts} [${level}] ${message}${metaStr}`;
  }),
);

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  winston.format.json(),
);

export function createLogger(name: string): winston.Logger {
  return winston.createLogger({
    level: process.env.LOG_LEVEL ?? 'info',
    format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
    defaultMeta: { service: name },
    transports: [new winston.transports.Console()],
  });
}
