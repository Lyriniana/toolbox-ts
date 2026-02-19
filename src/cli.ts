import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import router from './routes/index';
import { createLogger } from './utils/logger';

const logger = createLogger('app');

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api', router);

// Global error handler — must be last
app.use(errorHandler);

logger.info('Express application initialised');
export default app;
